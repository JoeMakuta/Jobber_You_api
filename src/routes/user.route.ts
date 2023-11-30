import { Router, Request, Response, NextFunction } from "express";
import User from "../controllers/user.controller";
import AuthRouter from "./auth.route";

const UserRouter: Router = Router();

UserRouter.use("/auth", AuthRouter);
UserRouter.get("/", User.getAll);
UserRouter.get("/:user_id", User.getOne);
UserRouter.put("/:user_id", User.updateOne);
UserRouter.delete("/:user_id", User.deleteOne);

export default UserRouter;
