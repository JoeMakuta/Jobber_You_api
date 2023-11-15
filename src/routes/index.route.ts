import { Router, Request, Response, NextFunction } from "express";
import HomeApi from "../controllers/index.controller";

const HomeRoute: Router = Router();

HomeRoute.use("/api", HomeApi.Home);

export default HomeRoute;
