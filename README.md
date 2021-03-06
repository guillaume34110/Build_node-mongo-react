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

1. install nodejs from : "https://nodejs.org/en/" (need V17.3.0)
2. download the github build pack : "Build_node-mongo-react-main" 
3. open terminal on build root 
4. use the following command on terminal

* install server package
 ```sh
npm i 
npm install -g nodemon
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
/!\ (put same token in index.js and helper.js)
5. modify mongoUrl inside server index.js by your mongodatabase path 
```sh
Connect to : https://cloud.mongodb.com/
DEPLOYMENT
    => Database
        click on button => Connect
        click on button => Connect your application (Connect your application to your cluster using MongoDB's native drivers)
1) Nodes.js | 4.0 or later
2) copy this path in Build_node-mongo-react-main/index.js in const mongoUrl
 /!\ replace <password> with your password from :
SECURITY
    => Database Access
        => User Name
```

now you can use it on local environement 

## Getting started 
1. to start the server side => use in this path <\Build_node-mongo-react-main> : "nodemon".
2. to start the client side => use in this path <\Build_node-mongo-react-main\app> : "npm start" .

 use command : "cd app" to go in app directory if it's existing in current path
 use command : "cd .." to go to upper directory
 use : ( ctrl + c ) to shutdown

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