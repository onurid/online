mkdir src
cd src
sh ../clone.sh
cd kimlik.online
docker-compose build api
# cd ..
# cd ileti.online
# sudo docker-compose build 
cd ../..
docker-compose -f docker-compose.yml -f src/kimlik.online/docker-compose.yml build public.gateway.reverseproxy public.gateway