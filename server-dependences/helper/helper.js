"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeStringFromArray = exports.logoutJWT = exports.authenticateJWT = void 0;
const jwt = require("jsonwebtoken");
const accessTokenSecret = "backendfirstapiwithusers";
const authenticateJWT = (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== undefined) {
        const token = authHeader.split(" ")[1];
        if (token !== undefined) {
            jwt.verify(token, accessTokenSecret, (err, user) => {
                if (err !== undefined) {
                    return res.sendStatus(403);
                }
                //@ts-expect-error
                if (typeof user === "string")
                    req['user'] = user;
                next(undefined);
            });
        }
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJWT = authenticateJWT;
const logoutJWT = (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== undefined) {
        const token = authHeader.split(" ")[1];
        if (token !== undefined) {
            jwt.sign(token, "", { expiresIn: 1 }, (logout, _err) => {
                if (logout !== undefined) {
                    return res.send({ msg: "You have been Logged Out" });
                }
                else {
                    res.send({ msg: "Error" });
                }
            });
        }
        ;
    }
    else {
        res.sendStatus(401);
    }
};
exports.logoutJWT = logoutJWT;
const removeStringFromArray = (array, string) => {
    return array.filter(e => e !== string); // will return ['A', 'C']
};
exports.removeStringFromArray = removeStringFromArray;
function next(_undefined) {
    throw new Error("Function not implemented.");
}
