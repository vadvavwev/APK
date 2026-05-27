#!/bin/bash
#===============================================
# Job Platform - Deploy Script
#===============================================

set -e

# Configuration
APP_DIR="/opt/jobplatform"
DEPLOY_USER="deploy"
TIMEESTAMP=$(date +%Y%m%d_%H%M%S)

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check if running as root or deploy user
if [ "$EUID" -eq 0 ]; then
    log_warn "Running as root is not recommended. Consider using deploy user."
    log_warn "Continuing anyway..."
fi

# Check if .env exists
if [ ! -f "$APP_DIR/.env" ]; then
    log_error ".env file not found in $APP_DIR"
    log_error "Please copy .env.production to .env and configure it"
    exit 1
fi

# Check if docker is running
if ! systemctl is-active --quiet docker; then
    log_error "Docker is not running"
    log_error "Run: sudo systemctl start docker"
    exit 1
fi

log_info "Starting Job Platform deployment..."

#===============================================
# 1. Backup current deployment
#===============================================
if [ -d "$APP_DIR/docker-compose.yml" ]; then
    log_info "Backing up current deployment..."
    BACKUP_DIR="$APP_DIR/backups/backup_$TIMEESTAMP"
    mkdir -p $BACKUP_DIR
    cp -r $APP_DIR/* $BACKUP_DIR/ 2>/dev/null || true
    log_info "Backup saved to $BACKUP_DIR"
fi

#===============================================
# 2. Stop existing containers
#===============================================
log_info "Stopping existing containers..."
cd $APP_DIR
docker-compose down 2>/dev/null || true

#===============================================
# 3. Build new images
#===============================================
log_info "Building backend image..."
docker-compose build --no-cache backend

#===============================================
# 4. Pull required images
#===============================================
log_info "Pulling required images..."
docker-compose pull mysql redis nginx

#===============================================
# 5. Start services
#===============================================
log_info "Starting services..."
docker-compose up -d

#===============================================
# 6. Wait for services to be healthy
#===============================================
log_info "Waiting for services to be ready..."
sleep 30

# Check container status
docker-compose ps

#===============================================
# 7. Check logs
#===============================================
log_info "Checking service logs..."
echo ""
echo "=== MySQL Logs ==="
docker-compose logs --tail=20 mysql
echo ""
echo "=== Redis Logs ==="
docker-compose logs --tail=10 redis
echo ""
echo "=== Backend Logs ==="
docker-compose logs --tail=30 backend
echo ""
echo "=== Nginx Logs ==="
docker-compose logs --tail=20 nginx

#===============================================
# 8. Health check
#===============================================
log_info "Performing health check..."

# Check if backend is responding
for i in {1..30}; do
    if curl -sf http://localhost:8080/api/actuator/health > /dev/null 2>&1; then
        log_info "Backend is healthy!"
        break
    fi
    if [ $i -eq 30 ]; then
        log_error "Backend health check failed after 30 attempts"
        log_error "Check logs: docker-compose logs backend"
        exit 1
    fi
    sleep 2
done

# Check if nginx is responding
for i in {1..10}; do
    if curl -sf http://localhost/health > /dev/null 2>&1; then
        log_info "Nginx is healthy!"
        break
    fi
    if [ $i -eq 10 ]; then
        log_warn "Nginx health check failed, but backend is up"
    fi
    sleep 1
done

echo ""
echo "=============================================="
echo -e "${GREEN}  Deployment Complete!${NC}"
echo "=============================================="
echo ""
echo "Services status:"
docker-compose ps
echo ""
echo "API should be available at: http://your-domain.com/api"
echo ""
echo "Useful commands:"
echo "  View logs:     ./logs.sh"
echo "  Restart:       ./restart.sh"
echo "  Update:        git pull && ./deploy.sh"
echo "  Stop services: docker-compose down"
echo ""
echo "=============================================="