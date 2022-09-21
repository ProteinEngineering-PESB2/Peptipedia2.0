FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

ENTRYPOINT ["nginx", "-g", "daemon off;"]