import express, { Response } from "express";
import { createServer } from "http";
import { MongoClient, Db, Collection, WithId } from "mongodb";
import jwt from "jsonwebtoken";
import cors from "cors";
import path from "path";
import * as helper from "./server-dependences/helper/helper";

import bcrypt from 'bcrypt';

const PORT = process.env.PORT || 3001;
const accessTokenSecret = "yourencodingstring";
const mongoUrl ="mongodb+srv://jean34:jeandatabase34@cluster0.tymsp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const staticPath = path.join(__dirname, "/app/build");

let db: Db;
let usersCollection: Collection<{ username: string; password: string }>;

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));

app.get("/", (_req: {}, res: Response): void => {
  res.sendFile(path.join(staticPath, "index.html"));
});

MongoClient.connect(mongoUrl).then((client) => {
  db = client.db("dataBaseName");
  usersCollection = db.collection("users");
  console.log("database connected ;D !");
});

app.post("/signup", async (req: { body: { username: string; password: string } }, res: Response) => {
  console.log(req.body);

  if ( db) {
    let usersList;
    try {
      usersList = await usersCollection.find({ username: req.body.username }).toArray();
    } catch {
      usersList = false;
    }

    if (usersList !== false) {
      usersCollection.insertOne(req.body);
      res.status(200).json(usersList);
      console.log("new user", req.body);
    } else {
      res.status(200).json("user already exists");
    }
  } else {
    res.status(400).json("error");
  }
});

app.post("/login", async (req: { body: { username: string; password: string } }, res: Response) => {
  if ( db) {
    let { username, password } = req.body;
    password = bcrypt.hashSync(password,10);

    const targetUser = await usersCollection.findOne({ username });

    if (password && targetUser && targetUser.password === password) {
      const accessToken = jwt.sign({ username }, accessTokenSecret);
      console.log(accessToken, "access");
      res.status(200).json({ accessToken });
    } else {
      res.status(500).send("Username or password incorrect");
    }
  } else {
    res.status(400).json("structure error");
  }
});

app.get("/tokenCheck", helper.authenticateJWT, (_req: {}, res: Response) => {
  res.status(200).json(true);
});

httpServer.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
