#!/bin/bash
#===============================================
# Job Platform - ECS Server Initialization Script
# Run as: sudo ./init-server.sh
#===============================================

set -e

echo "=============================================="
echo "  Job Platform - Alibaba Cloud ECS Setup"
echo "  Ubuntu 22.04 LTS"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    log_error "Please run as root: sudo $0"
    exit 1
fi

# Check OS version
if [ ! -f /etc/os-release ]; then
    log_error "Cannot detect OS version"
    exit 1
fi

. /etc/os-release
if [ "$ID" != "ubuntu" ] || [ "$VERSION_ID" != "22.04" ]; then
    log_warn "This script is designed for Ubuntu 22.04 LTS"
    log_warn "Detected: $ID $VERSION_ID"
fi

#===============================================
# 1. System Update
#===============================================
log_info "Updating system packages..."
apt update && apt upgrade -y

#===============================================
# 2. Install Essential Tools
#===============================================
log_info "Installing essential tools..."
apt install -y curl wget unzip git vim certbot python3-certbot-nginx ufw fail2bansoftware-properties-common apt-transport-https ca-certificates lsb-release gnupg2

#===============================================
# 3. Docker Installation
#===============================================
log_info "Installing Docker..."
if command -v docker &> /dev/null; then
    log_warn "Docker is already installed"
    docker --version
else
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
    log_info "Docker installed successfully"
    docker --version
fi

# Install Docker Compose
if command -v docker-compose &> /dev/null; then
    log_warn "Docker Compose is already installed"
else
    log_info "Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
    log_info "Docker Compose installed"
    docker-compose --version
fi

#===============================================
# 4. Add current user to docker group
#===============================================
log_info "Configuring Docker group..."
CURRENT_USER=${SUDO_USER:-$(whoami)}
if [ "$CURRENT_USER" != "root" ]; then
    usermod -aG docker $CURRENT_USER
    log_info "User $CURRENT_USER added to docker group"
fi

#===============================================
# 5. Configure UFW Firewall
#===============================================
log_info "Configuring UFW firewall..."

# Default policies
ufw default deny incoming
ufw default allow outgoing

# Allow SSH (prevent lockout)
ufw allow 22/tcp comment 'SSH'

# Allow HTTP/HTTPS
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'

# Allow custom app port if needed
# ufw allow 8080/tcp comment 'App Backend'

# Enable UFW
echo "y" | ufw enable
ufw status numbered

log_info "UFW firewall configured"

#===============================================
# 6. Configure Fail2Ban
#===============================================
log_info "Configuring Fail2Ban..."
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5
destemail = your-email@domain.com
sender = fail2ban@your-server.com
action = %(action_mwl)s

[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 86400

[nginx-http-auth]
enabled = true
port = 80,443
logpath = /var/log/nginx/error.log
maxretry = 5
EOF

systemctl enable fail2ban
systemctl restart fail2ban
log_info "Fail2Ban configured"

#===============================================
# 7. Configure Swap (if needed)
#===============================================
if [ $(free -m | awk '/Mem:/ {print $2}') -lt 2048 ]; then
    log_warn "System has less than 2GB RAM. Consider adding swap."
    log_warn "Skipping swap configuration."
else
    log_info "Memory is sufficient"
fi

#===============================================
# 8. Create app directory
#===============================================
log_info "Creating application directory..."
mkdir -p /opt/jobplatform
cd /opt/jobplatform
log_info "Application directory: /opt/jobplatform"

#===============================================
# 9. Nginx installation check
#===============================================
if command -v nginx &> /dev/null; then
    log_warn "Nginx is already installed"
else
    log_info "Nginx will be managed by Docker in production"
fi

#===============================================
# 10. Security Hardening
#===============================================
log_info "Applying security hardening..."

# Disable root SSH login
sed -i 's/^PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config

# Reload SSH
systemctl reload ssh

# Set proper permissions
chmod 700 /root
chmod 600 /etc/ssh/sshd_config

log_info "Security hardening applied"

#===============================================
# 11. Docker daemon config for production
#===============================================
log_info "Configuring Docker daemon..."
mkdir -p /etc/docker
cat > /etc/docker/daemon.json << 'EOF'
{
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "10m",
        "max-file": "3"
    },
    "storage-driver": "overlay2",
    "live-restore": true
}
EOF

systemctl restart docker
log_info "Docker daemon configured"

#===============================================
# 12. Create deploy user
#===============================================
log_info "Creating deploy user..."
if id "deploy" &>/dev/null; then
    log_warn "User 'deploy' already exists"
else
    useradd -m -s /bin/bash -G docker deploy
    mkdir -p /home/deploy/jobplatform
    chown -R deploy:deploy /home/deploy/jobplatform
    log_info "User 'deploy' created"
fi

echo ""
echo "=============================================="
echo -e "${GREEN}  Server Initialization Complete!${NC}"
echo "=============================================="
echo ""
echo "Next steps:"
echo "1. Copy your project files to /opt/jobplatform"
echo "2. Configure .env file"
echo "3. Run ./deploy.sh to start services"
echo ""
echo "Important security changes applied:"
echo "  - Root SSH login disabled"
echo "  - Password authentication disabled"
echo "  - UFW firewall enabled"
echo "  - Fail2Ban configured"
echo ""
echo -e "${YELLOW}NOTE: Reboot the server before deploying!${NC}"
echo "=============================================="