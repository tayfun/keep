#!/bin/sh
# Script for running multiple commands in a container.
# Adapted from https://docs.docker.com/engine/admin/multi-service_container/

uwsgi --plugins-dir /usr/lib/uwsgi/ --need-plugin python3 --uwsgi-socket 127.0.0.1:8000 --chdir /app --wsgi-file $PROJECT_NAME/wsgi.py --master --processes 2 --threads 2 --env DJANGO_SETTINGS_MODULE=$PROJECT_NAME.settings_prod --max-requests=100 --harakiri=45 --daemonize2 /var/log/uwsgi/uwsgi.log
status=$?
if [ $status -ne 0 ]; then
    echo "uWSGI failed to start: $status"
    exit $status
else
    echo "uWSGI finished initializing"
fi

nginx
status=$?
if [ $status -ne 0 ]; then
    echo "nginx failed to start: $status"
    exit $status
else
    echo "nginx finished initializing"
fi

while true; do
    ps aux | grep uwsgi | grep -q -v grep
    uwsgi_status=$?
    ps aux | grep nginx | grep -q -v grep
    nginx_status=$?

    if [ $uwsgi_status -ne 0 ]; then
        echo "uWSGI died"
        exit -1
    fi
    if [ $nginx_status -ne 0 ]; then
        echo "nginx died"
        exit -1
    fi
    sleep 60
done
