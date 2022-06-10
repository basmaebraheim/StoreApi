# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints 

##### users Api

##### post /api/users

userName : string
firstName : string
lastName : string
password : string

add new user

##### get /api/users

get all users

##### get /api/users/:id

get user with id

##### post /api/users/authenticate

userName : string
password : string

get user token
###### orders api
##### post /api/orders

user_id: number,
status: "open" / "closed"

create new order for user with id user_id

##### get /api/orders

user_id: number
get user orders

##### post /api/orders

user_id: number,
status: "open" / "closed"

create new order for user with id user_id

##### get /api/orders

user_id: number
get user orders

##### get /api/orders/:id/products

get products for order with id

##### post /api/orders/:id/products

productId: number
quantity: number

###### products api
##### get /api/products

get all products

##### get /api/products/:id

get product with id

##### post /api/products

price: number
name: string

add new product

## Data schema

##### products

id SERIAL PRIMARY KEY ,
name VARCHAR(255) ,
price integer

##### orders

id SERIAL PRIMARY KEY ,
user_id bigint,
status VARCHAR(100),
FOREIGN KEY (user_id) REFERENCES users(id)

##### order_products

id SERIAL PRIMARY KEY ,
quantity integer,
order_id bigint,
FOREIGN KEY (order_id) REFERENCES orders(id) ,
product_id bigint,
FOREIGN KEY (product_id) REFERENCES products(id)

##### users

id SERIAL PRIMARY KEY ,
username VARCHAR(255) ,
firstName VARCHAR(255) ,
lastName VARCHAR(255) ,
password VARCHAR(255)
