# Node+React+Mongo_build


20/02/2022
hello it's my app starter pack .

## Description

this pack contains an http server ,a socket io, a Mongo database and a React app .

#### server side feathure :

* sha256 encryption for password authentication
* jwtToken for secure authentication
* Mogodb configuration (commented)
* socket io configuration
* authentication request implemented (login, signup)
* authentication with jwtToken verification request  

#### client side feathure :

* React router with privateRoute
* Privateroute with jwtToken check
* Global props on the router
* Client socket io connection ready 
* Signup page to create an account ready to use with your database
* Login page ready to use   
* Loby page with socket io ready to use

## Built With

* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.dev/)
* [Mongodb](https://mongodb.com/)

## Installation

steps : 

1. download build 
2. open terminal on build root 
3. use the following command on terminal
* install server package
 ```sh
npm i 
```
* go to app
 ```sh
cd app
```
* install client package
 ```sh
npm i 
```
4. modify accessTokenSecret inside server index.js and helper.js by your token (ex : 'mytoken')
5. modify mogoUrl inside server index.js by your mongodatabase path 

now you can use it on local environement 

## Getting started 
1. to start the server use nodemon command on his root .
2. to start the client side use npm start on his root (cd app) .

## Deploy
this build is deployable on heroku .
if you want deploy this build on heroku don't forget to replace the .gitignore inside the react app ,only the final react build is on the sever.

## testing build 
1.make your buil on your app root with 
```sh
npm build 
```
2. start your server on port 3001
3. use http://localhost:3001/ and test your build 