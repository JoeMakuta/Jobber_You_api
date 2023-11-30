import { Router, Request, Response, NextFunction } from "express";
import HomeApi from "../controllers/index.controller";
import RoleRouter from "./role.route";
import SkillRouter from "./skill.route";

const ApiRouter: Router = Router();

ApiRouter.get("/", HomeApi.Home);
ApiRouter.use("/role", RoleRouter);
ApiRouter.use("/skill", SkillRouter);

export default ApiRouter;
