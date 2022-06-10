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



##### environmet variables
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=stores
POSTGRES_USER=postgres
POSTGRES_PASSWORD=12345678
POSTGRES_TEST_DB=postgres_test
ENV=dev
BCRYPT_PASSWORD=12345678
SALT_ROUNDS=10
TOKEN_SECRET=123