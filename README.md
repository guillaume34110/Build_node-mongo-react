# Node+React+Mongo_build
20/02/2022
hello it's my app starter pack .

this pack contains an http server ,a socket io, a Mongo database and a React app .


steps : 

download build 

open terminal on build root 

use the following command on terminal

run "npm i "

run "cd app"

run "npm i " 

modify accessTokenSecret inside server index.js and helper.js by your token (ex : 'mytoken')

modify mogoUrl inside server index.js by your mongodatabase path 


now you can use it on local environement 

this build is deployable on heroku .
if you want deploy this build on heroku don't forget to replace the .gitignore inside the react app ,only the final react build is on the sever.
nodemon to start server