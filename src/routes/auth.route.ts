import { Router, Request, Response, NextFunction } from "express";
import User from "../controllers/user.controller";

const AuthRouter: Router = Router();

AuthRouter.post("/login", User.login);
AuthRouter.post("/signup", User.add);

export default AuthRouter;
