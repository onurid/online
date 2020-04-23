FROM nginx:alpine

#  default conf for proxy service
COPY gateway/nginx.conf /etc/nginx/nginx.conf

RUN apk add git

COPY src/kimlik.online/gateway/clone.sh ./clone.sh
RUN chmod +x ./clone.sh 
RUN ./clone.sh

# NOT FOUND response
COPY gateway/backend-not-found.html /var/www/html/backend-not-found.html
RUN cp -r /clientapp/. /var/www/html/

COPY src/kimlik.online/client/system/modules/. /var/www/html/system/modules/.
COPY src/kimlik.online/client/system/services/. /var/www/html/system/services/.
COPY src/kimlik.online/client/system/apps/. /var/www/html/system/apps/.
COPY src/kimlik.online/client/system/configs/. /var/www/html/system/configs/.
COPY src/kimlik.online/client/templates/default/assets/img/. /var/www/html/templates/default/assets/img/.
COPY src/kimlik.online/client/templates/default/modules/. /var/www/html/templates/default/modules/.

COPY src/kimlik.online/client/templates/default/index.html /var/www/html/templates/default/index.html

# Proxy configurations
COPY gateway/includes/ /etc/nginx/includes/

EXPOSE 80