import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json("Token missing");
  }

  try {
    const decode = jwt.verify(token, "AUTH_TOKEN");

    //@ts-ignore
    req.id = decode.id
    next()

  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
