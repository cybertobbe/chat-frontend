# To run
mvn clean package

docker build -t chatgut/frontend:version .

docker run -p 8080:8080 chatgut/frontend:version

The following services are used:

#### Chat messages
https://github.com/chatgut/microPostService

#### Images upload
https://github.com/chatgut/imageService
https://github.com/chatgut/ImageServiceBoV

#### Like messages
https://github.com/chatgut/worthreadingservice

#### User profiles
https://github.com/chatgut/UserService

#### Auth
https://github.com/chatgut/AuthService2

### Url-Shortener from frontend
https://github.com/chatgut/micro-url-shortener-service
https://github.com/chatgut/URLShortenerService
