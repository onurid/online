FROM nginx:alpine

#  default conf for proxy service
COPY gateway/nginx.conf /etc/nginx/nginx.conf

# NOT FOUND response
COPY gateway/backend-not-found.html /var/www/html/backend-not-found.html
COPY client/. /var/www/html/.

# Proxy configurations
COPY gateway/includes/ /etc/nginx/includes/

EXPOSE 80