cd src
cd kimlik.online
git pull
docker-compose build --no-cache api
# cd ..
# cd ileti.online
# git pull
cd ../..
docker-compose -f docker-compose.yml -f src/kimlik.online/docker-compose.yml build --no-cache public.gateway.reverseproxy public.gateway
