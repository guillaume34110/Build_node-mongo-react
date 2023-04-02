import type { Response, Request } from "express";

import jwt = require("jsonwebtoken");
const accessTokenSecret = "backendfirstapiwithusers";
export const authenticateJWT = (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization;

  if (authHeader !== undefined ) {
    const token = authHeader.split(" ")[1];
    if (token !== undefined) {
      jwt.verify(token, accessTokenSecret, (err: unknown, user: unknown) => {
        if (err !== undefined) {
          return res.sendStatus(403);
        }
//@ts-expect-error
        if (typeof user === "string" ) req['user'] = user;
        next(undefined);
      });
    }
  } else {
    res.sendStatus(401);
  }
};
export const logoutJWT = (req: Request, res: Response) : void =>  {
  const authHeader = req.headers.authorization;

  if (authHeader !== undefined) {
    const token = authHeader.split(" ")[1];
    if (token !== undefined) {
    jwt.sign(token, "", { expiresIn: 1 }, (logout:unknown, _err: unknown) => {
      if (logout !== undefined) {
        return res.send({ msg: "You have been Logged Out" });
      } else {
        res.send({ msg: "Error" });
      }
    })
  };
  } else {
    res.sendStatus(401);
  }
};

export const removeStringFromArray = (array: string[], string: string): string[] => {
    return array.filter(e => e !== string); // will return ['A', 'C']
};
function next(_undefined: undefined) {
    throw new Error("Function not implemented.");
  }