const fs = require('fs')



function checkStructure(requiredData, newData) {
    const referenceKeys = Object.keys(requiredData)
    const newDataKey = Object.keys(newData)
    if (JSON.stringify(referenceKeys) === JSON.stringify(newDataKey)) {
        let token = 0
        referenceKeys.forEach(key => {
            if (typeof requiredData[key] === typeof newData[key]) {
                token++
            }
        })
        if (token === referenceKeys.length) return true
        else return false
    } else return false
}

const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
   let accessTokenSecret = 'yourencodingstring'
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
const logoutJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
   
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.sign(token,"", {expiresIn: 1 } , ( logout,err) => {
            if (logout) {
                return res.send({msg : 'You have been Logged Out' });
            }else {
                res.send({msg:'Error'});
            }
        });
    } else {
        res.sendStatus(401);
    }
};
const removeStringFromArray = (array,string) => {
     array.filter(e => e !== string); // will return ['A', 'C']
}

module.exports = {
    checkStructure,
    authenticateJWT,
    logoutJWT,
    removeStringFromArray
}