FROM alpine:3.6
RUN apk add --no-cache --update \
        uwsgi \
        uwsgi-python3 \
        python3 \
        git \
        py3-psycopg2 \
        nginx && rm -rf /var/cache/apk/*
WORKDIR /app
COPY . .
RUN ln -s /app/conf/nginx-site.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf
RUN chmod +x conf/wrapper_script.sh
RUN mkdir /run/nginx
RUN pip3 install --no-cache-dir -r requirements.txt
EXPOSE 80
CMD ./conf/wrapper_script.sh
