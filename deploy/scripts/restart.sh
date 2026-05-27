#!/bin/bash
#===============================================
# Job Platform - Restart Script
#===============================================

set -e

APP_DIR="/opt/jobplatform"

echo "Restarting Job Platform services..."
cd $APP_DIR

# Stop and start
docker-compose restart

# Wait
sleep 10

# Status
echo ""
echo "Service status:"
docker-compose ps

echo ""
echo "Restart complete!"