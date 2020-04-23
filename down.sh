cd src
cd kimlik.online
git pull
docker-compose down
# cd ..
# cd ileti.online
# git pull
cd ../..
docker-compose -f docker-compose.yml -f src/kimlik.online/docker-compose.yml down
