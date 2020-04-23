FROM nginx:alpine

#  default conf for proxy service
COPY gateway/nginx.conf /etc/nginx/nginx.conf

RUN apk add git

COPY gateway/clone.sh ./clone.sh
RUN chmod +x ./clone.sh 
RUN ./clone.sh

# NOT FOUND response
COPY gateway/backend-not-found.html /var/www/html/backend-not-found.html
RUN cp -r /clientapp/. /var/www/html/

COPY client/system/modules/. /var/www/html/system/modules/.
COPY client/system/services/. /var/www/html/system/services/.
COPY client/system/apps/. /var/www/html/system/apps/.
COPY client/system/configs/. /var/www/html/system/configs/.
COPY client/templates/default/assets/img/. /var/www/html/templates/default/assets/img/.
COPY client/templates/default/modules/. /var/www/html/templates/default/modules/.

COPY client/templates/default/index.html /var/www/html/templates/default/index.html


# Proxy configurations
COPY gateway/includes/ /etc/nginx/includes/

EXPOSE 80