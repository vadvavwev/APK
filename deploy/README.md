# Job Platform - Production Deployment Guide

## Overview

This is a production-ready deployment configuration for the Job Platform application.

## Architecture

```
                    ┌─────────────────┐
                    │   Internet      │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │     Nginx       │  (Port 80/443)
                    │  Reverse Proxy │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
    ┌───────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
    │    MySQL     │  │    Redis    │  │   Backend   │
    │   (Port 3306)│  │  (Port 6379)│  │ (Port 8080) │
    └──────────────┘  └─────────────┘  └─────────────┘
```

## Prerequisites

- Alibaba Cloud ECS instance (Ubuntu 22.04 LTS)
- SSH access to the server
- Domain name pointed to server IP (optional but recommended)

## Directory Structure

```
/opt/jobplatform/
├── docker-compose.yml      # Main orchestration file
├── .env                    # Environment variables (create from .env.production)
├── backend/
│   ├── Dockerfile          # Multi-stage Spring Boot build
│   ├── pom.xml             # Maven configuration
│   ├── src/                # Java source code
│   └── init.sql            # Database initialization
├── nginx/
│   ├── nginx.conf          # Main Nginx configuration
│   ├── conf.d/default.conf # Site configuration
│   ├── ssl/                # SSL certificates (add your own)
│   └── logs/               # Nginx logs
└── scripts/
    ├── init-server.sh      # Server initialization
    ├── deploy.sh           # Deploy/update script
    ├── restart.sh          # Restart services
    ├── stop.sh             # Stop services
    ├── logs.sh             # View logs
    └── status.sh           # Service status
```

## Quick Start

### Step 1: Initialize Server

SSH into your server and run:

```bash
sudo ./init-server.sh
```

Then reboot:
```bash
sudo reboot
```

### Step 2: Upload Project Files

From your local machine:

```bash
scp -r ./deploy deploy@your-server-ip:/opt/jobplatform
```

### Step 3: Configure Environment

On the server:

```bash
cd /opt/jobplatform
cp .env.production .env
nano .env  # Edit with your actual values
```

### Step 4: Deploy

```bash
cd /opt/jobplatform
chmod +x scripts/*.sh
sudo ./scripts/deploy.sh
```

## Configuration

### Environment Variables (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| MYSQL_ROOT_PASSWORD | MySQL root password | Yes |
| DB_USERNAME | Application database user | Yes |
| DB_PASSWORD | Application database password | Yes |
| REDIS_PASSWORD | Redis password | Yes |
| JWT_SECRET | JWT signing secret (min 32 chars) | Yes |
| CORS_ORIGINS | Allowed CORS origins | Yes |

### Domain Configuration

1. Point your domain to the server IP in your DNS settings
2. Edit `nginx/conf.d/default.conf`
3. Replace `your-domain.com` with your actual domain
4. Add SSL certificates to `nginx/ssl/`

## API Endpoints

Once deployed, the API will be available at:

- API Base URL: `https://your-domain.com/api`
- Swagger UI (if enabled): `https://your-domain.com/swagger-ui.html`
- Health Check: `https://your-domain.com/api/actuator/health`

## Android APK Configuration

Update your Capacitor configuration to use the production API:

```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  server: {
    androidScheme: 'https',
    hostname: 'your-domain.com'
  }
}
```

## Monitoring

### View Logs

```bash
# All services
./logs.sh

# Specific service
./logs.sh backend
./logs.sh -f backend  # Follow mode
```

### Service Status

```bash
./status.sh
```

### Health Checks

```bash
# Backend health
curl http://localhost:8080/api/actuator/health

# Nginx health
curl http://localhost/health
```

## Backup & Recovery

### Backup

```bash
# Manual backup
docker-compose down
cp -r /opt/jobplatform /opt/jobplatform-backup-$(date +%Y%m%d)

# Database backup
docker exec jobplatform-mysql mysqldump -u root -p job_platform > backup.sql
```

### Recovery

```bash
# Stop services
docker-compose down

# Restore files
rm -rf /opt/jobplatform
cp -r /opt/jobplatform-backup-YYYYMMDD /opt/jobplatform

# Restart
docker-compose up -d
```

## Security

- UFW firewall enabled
- Fail2Ban configured
- Root SSH disabled
- Password authentication disabled
- Non-root user (deploy) for application
- Docker containers run as non-root users
- HTTPS enforced via Nginx
- JWT authentication required

## Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs backend

# Check resource usage
docker stats

# Restart
docker-compose restart backend
```

### Database connection failed

```bash
# Check MySQL is running
docker-compose ps mysql

# Check MySQL logs
docker-compose logs mysql

# Test connection
docker exec -it jobplatform-mysql mysql -u root -p
```

### SSL certificate issues

```bash
# Check certificate files exist
ls -la nginx/ssl/

# Test nginx config
docker exec jobplatform-nginx nginx -t

# Renew certificates
certbot renew
```

## Maintenance

### Update Application

```bash
git pull
./deploy.sh
```

### Update Docker Images

```bash
docker-compose pull
docker-compose up -d
```

### Log Rotation

Logs are automatically rotated by Docker with max 10MB per file, 3 files max.

## License

MIT