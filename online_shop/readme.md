Store Management System
This Node.js application implements a simple store management system. The system allows users to interact with a store inventory, perform operations like adding items to the cart, calculating the total price, and viewing the items in the cart.

Setup
Database Setup: The application uses MongoDB as its database. Ensure you have MongoDB installed and running on your local machine.

Dependencies Installation: Install the required Node.js packages using the following command:
npm install
Run the Application: Start the Node.js server by running the following command:
node app.js

Usage
Endpoints
POST /add: Add an item to the cart.

Request Body: JSON object with name and quantity of the item to add.
Example:
{
    "name": "coffe",
    "quantity": 2
}
Response:
201 Created: Success message if the item is added successfully.
400 Bad Request: If the request body is missing or if the requested item is not available or insufficient in stock.
GET /total_price: Calculate the total price of the items in the cart.

Response:
200 OK: Total price of the items in the cart.
GET /show_cart: View the items in the cart.

Response:
200 OK: JSON array containing the items in the cart.
Example Usage
Add an item to the cart:
curl -X POST -H "Content-Type: application/json" -d '{"name": "coffe", "quantity": 2}' http://localhost:3000/add
Calculate the total price:
curl http://localhost:3000/total_price
View the items in the cart:

curl http://localhost:3000/show_cart

Note
Ensure MongoDB is running on your machine and accessible to the application.
The createDb() function initializes the database schema and sample data. Adjust as needed for your application.
Error handling and input validation are minimal. Enhance as required for production use.
Modify the application logic and routes as needed to suit your requirements.