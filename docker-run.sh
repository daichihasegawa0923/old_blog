docker image build -t mysql-blog -f DockerfileMySQL .
docker run -d -p 3307:3306 --name mysql-blog -it mysql-blog