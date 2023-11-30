import * as express from "express";
import * as jwt from "jsonwebtoken";

export interface IUserRequest extends express.Request {
  auth?: jwt.JwtPayload | string | any;
}

export interface IPayLoad {
  id: string;
  email: string;
}
