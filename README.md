# Project Title : storeApi

its a store to sell products online

##### package installation instructions

    ## use   $npm install command to install all packages the project needs

##### how to setup and connect to the database

    ## Use user name : postgres  and password 12345678 for postgres user
    ## create database called stores
    ## SERVER = 127.0.0.1
    ## PORT : 3000
    # run migrations using the command  >> $ db-migrate up

##### To build the project for production

    ## api PORT : 3000

    $ npm run build

##### To Run the code formatter and Eslint

    $ npm run lint
    $ npm run lint:fix

##### Running the project in development

    # run the project
       $ npm run start

##### Build the project then running the tests

    $ npm run test

##### Running the project in production

    $ node build/.

##### Database schema

##### 1=> users

id bigint (PK)
userName varchar
firstName varchar
lastName varchar
password varchar

##### 1=> orders

id nigint(PK) ,
user_id bigint (FOREIGN KEY (orders),

##### 1=> products

id bigint (PK)
name varchar
price integer

##### 1=> order_products

id nigint(PK) ,
quantity integer,
order_id bigint (FOREIGN KEY (orders),
product_id bigint bigint (FOREIGN KEY (products))

##### Database schema

##### post (/users)

userName : string
firstName : string
lastName : string
password : string

add new user

##### get /users

get all users

##### get users/:id

get user with id

##### post users/authenticate

userName : string
password : string

get user token

##### post /orders

user_id: number,
status: "open" / "closed"

create new order for user with id user_id

##### get /orders

user_id: number
get user orders

##### oproducts api

##### post /orders

user_id: number,
status: "open" / "closed"

create new order for user with id user_id

##### get /orders

user_id: number
get user orders

##### get /orders/:id/products

get products for order with id

##### post /orders/:id/products

productId: number
quantity: number

##### get /products

get all products

##### get /products/:id

get product with id

##### post /products

price: number
name: string

add new product
