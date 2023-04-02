"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const mongodb_1 = require("mongodb");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const helper = __importStar(require("./server-dependences/helper/helper"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const PORT = process.env.PORT || 3001;
const accessTokenSecret = "yourencodingstring";
const mongoUrl = "mongodb+srv://jean34:jeandatabase34@cluster0.tymsp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const staticPath = path_1.default.join(__dirname, "/app/build");
let db;
let usersCollection;
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(staticPath));
app.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(staticPath, "index.html"));
});
mongodb_1.MongoClient.connect(mongoUrl).then((client) => {
    db = client.db("dataBaseName");
    usersCollection = db.collection("users");
    console.log("database connected ;D !");
});
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    if (db) {
        let usersList;
        try {
            usersList = yield usersCollection.find({ username: req.body.username }).toArray();
        }
        catch (_a) {
            usersList = false;
        }
        if (usersList !== false) {
            usersCollection.insertOne(req.body);
            res.status(200).json(usersList);
            console.log("new user", req.body);
        }
        else {
            res.status(200).json("user already exists");
        }
    }
    else {
        res.status(400).json("error");
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (db) {
        let { username, password } = req.body;
        password = bcrypt_1.default.hashSync(password, 10);
        const targetUser = yield usersCollection.findOne({ username });
        if (password && targetUser && targetUser.password === password) {
            const accessToken = jsonwebtoken_1.default.sign({ username }, accessTokenSecret);
            console.log(accessToken, "access");
            res.status(200).json({ accessToken });
        }
        else {
            res.status(500).send("Username or password incorrect");
        }
    }
    else {
        res.status(400).json("structure error");
    }
}));
app.get("/tokenCheck", helper.authenticateJWT, (_req, res) => {
    res.status(200).json(true);
});
httpServer.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
