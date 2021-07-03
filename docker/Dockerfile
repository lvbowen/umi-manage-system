FROM registry.cn-zhangjiakou.aliyuncs.com/yunli/nginx_base:1.0

RUN mkdir /app

copy build /app/

copy default.conf.template /etc/nginx/templates/default.conf.template

WORKDIR /app

EXPOSE 80
