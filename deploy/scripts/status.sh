#!/bin/bash
#===============================================
# Job Platform - Status Script
#===============================================

APP_DIR="/opt/jobplatform"
cd $APP_DIR

echo "=============================================="
echo "  Job Platform - Service Status"
echo "=============================================="
echo ""
echo "Container Status:"
docker-compose ps
echo ""
echo "Container Health:"
docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Health}}"