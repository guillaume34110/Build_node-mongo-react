/*server*/
const express = require("express");
const {createServer} = require("http");
const PORT = process.env.PORT || 3001
const app = express(); // create express app
const httpServer = createServer(app);
/*path*/
const path = __dirname + '/app/build';
/*dependences and utilities*/
const jwt = require('jsonwebtoken');
const helper = require('./server-dependences/helper/helper.js');
const dataStructure = require('./server-dependences/data-structure/dataStructure.js');
const {sha256} = require('./server-dependences/helper/sha256.js')
const {json} = require('express/lib/response');
/*socket.io*/ 
const {Server} = require("socket.io");
const io = new Server(httpServer, {
    /* options */
    cors: {origin: "*"}
});
/*accesstoken*/
const accessTokenSecret = 'yourencodingstring';
/*Mongo */
const MongoClient = require('mongodb').MongoClient
const mongoUrl = 'your mongo url'
/*database collections */
let db
let usersCollection 
/*Middleware*/
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
/*routes*/
app.use(express.static(path));
app.get('/', function (req,res) {
  res.sendFile(path + "/index.html");
})

/*database connexion*/
/*
MongoClient.connect( mongoUrl, {
        useUnifiedTopology: true
    })
    .then(client => {
        db = client.db('pinguinyFighters')
        usersCollection = db.collection('users')
       
        socket()
    })

    .catch(error => console.error(error))
    */

/*signup requests */
app.post('/signup',cors(), async (req, res) => {
    console.log(req.body)
  if (helper.checkStructure(dataStructure.signupStructure, req.body) && db) {
          let usersList
           try {usersList = await db.collection('users').find({'username':req.body.username}).toArray()}  
           catch {usersList = false}
          if (!usersList ) {
              usersCollection.insertOne(req.body)
              res.status(200).json(usersList)
              console.log('new user' , req.body)
          } else {
              res.status(200).json('user already exist')
          }
  } else {
      res.status(400).json('error')
  }
})

/*login request */ 
app.post('/login', async (req, res) => {
    if (helper.checkStructure(dataStructure.loginStructure, req.body) && db) {
        // Read username and password from request body
        let {
            username,
            password
        } = req.body;
        password = sha256(password)

        let userName = {
            username: username
        }
        const targetUser = await db.collection('users').findOne(userName)
        if (password && targetUser) {
            if (targetUser.password === password) {
                console.log('match');
                // Generate an access token
                const accessToken = jwt.sign({
                    username: username
                }, accessTokenSecret);
console.log(accessToken ,"access")
                res.status(200).json({
                    accessToken
                });
            }
        } else {
            res.status(500).send('Username or password incorrect');
        }
    } else res.status(400).json('structure error')

});

/*privateRoute*/
app.get('/tokenCheck', helper.authenticateJWT, (req, res) => {
    res.status(200).json(true)
})

/*socket io */
const socket = () => {

    io.use(function (socket, next) {

            if (socket.handshake.query && socket.handshake.query.token) {
                jwt.verify(socket.handshake.query.token, accessTokenSecret, function (err, decoded) {
                    if (err) return next(new Error('Authentication error'));
                    socket.decoded = decoded;
                    next();
                });
            } else {
                next(new Error('Authentication error'));
            }
        })
        .on("connection", (socket) => {
            io.emit('connection')
            console.log('user connected');
            socket.on('deco', () => {
                io.emit('deco')
            })  

        });
}
// start express server on port 5000
httpServer.listen(PORT);

