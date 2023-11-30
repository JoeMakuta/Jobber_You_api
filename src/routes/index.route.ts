import { Router, Request, Response, NextFunction } from "express";
import HomeApi from "../controllers/index.controller";
import RoleRouter from "./role.route";
import ApiRouter from "./api.route";

const HomeRoute: Router = Router();

HomeRoute.use("/api", ApiRouter);

export default HomeRoute;
