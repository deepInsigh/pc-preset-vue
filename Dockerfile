FROM hub.360scm.com/library/nginx:stable-alpine
ARG source
WORKDIR /app
COPY ${source:-.} /usr/share/nginx/html
COPY ${source:-default.template} /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
