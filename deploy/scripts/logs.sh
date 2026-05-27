#!/bin/bash
#===============================================
# Job Platform - Logs Script
#===============================================

APP_DIR="/opt/jobplatform"
cd $APP_DIR

if [ "$1" == "-f" ]; then
    # Follow logs
    shift
    SERVICE=${1:-}
    if [ -n "$SERVICE" ]; then
        docker-compose logs -f --tail=100 $SERVICE
    else
        docker-compose logs -f --tail=100
    fi
else
    SERVICE=${1:-backend}
    echo "Showing logs for: $SERVICE"
    echo "Use '$0 -f [service]' to follow logs"
    echo ""
    docker-compose logs --tail=100 $SERVICE
fi