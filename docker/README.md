Docker commands

docker network create --subnet 172.18.3.0/24 kinkeepers

docker run -d --name kk-pg -e POSTGRES_PASSWORD=password -v /home/kalpak/projects/techbulls/poc/kin-keepers/docker/postgres/data:/var/lib/postgresql/data --network kinkeepers --ip 172.18.3.2 postgres:11.1-alpine


