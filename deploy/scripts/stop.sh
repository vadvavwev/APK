#!/bin/bash
#===============================================
# Job Platform - Stop Script
#===============================================

APP_DIR="/opt/jobplatform"
cd $APP_DIR

echo "Stopping Job Platform services..."
docker-compose down

echo ""
echo "All services stopped."
echo "To start again: ./deploy.sh"