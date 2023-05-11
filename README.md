# To run
mvn clean package

docker build -t chatgut/frontend:version .

docker run -p 8080:8080 chatgut/frontend:version

The following services are now implemented:

#### Chat messages
Our userID is set as http header called userID.

POST http://localhost:8000/posts
{
to: chatID,
message: message
}

---
GET http://localhost:8000/posts?to=chatID

#### Images upload
