# Node+React+Mongo_build


20/02/2022
hello it's my app starter pack .

this pack contains an http server ,a socket io, a Mongo database and a React app .
### Built With
* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.dev/)
* [Mongodb](https://mongodb.com/)
## Getting Started
steps : 

1. download build 
2. open terminal on build root 
3. use the following command on terminal
* install server package
 ```sh
run "npm i "
```
* go to app
 ```sh
run "cd app"
```
* install client package
 ```sh
run "npm i " 
```
4. modify accessTokenSecret inside server index.js and helper.js by your token (ex : 'mytoken')
5. modify mogoUrl inside server index.js by your mongodatabase path 

now you can use it on local environement 

## Deploy
this build is deployable on heroku .
if you want deploy this build on heroku don't forget to replace the .gitignore inside the react app ,only the final react build is on the sever.
nodemon to start server