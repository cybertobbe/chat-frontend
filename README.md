# To run
mvn clean package
docker build -t chatgut/frontend:version .
docker run -p 8080:8080 chatgut/frontend:version
