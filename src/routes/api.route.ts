import { Router, Request, Response, NextFunction } from "express";
import HomeApi from "../controllers/index.controller";
import RoleRouter from "./role.route";
import SkillRouter from "./skill.route";
import UserRouter from "./user.route";
import verifyToken from "../middlewares/verifyToken";
import LocationRouter from "./location.route";
import JobRouter from "./job.route";

const ApiRouter: Router = Router();

ApiRouter.get("/", HomeApi.Home);
ApiRouter.use("/role", verifyToken, RoleRouter);
ApiRouter.use("/skill", verifyToken, SkillRouter);
ApiRouter.use("/user", UserRouter);
ApiRouter.use("/location", verifyToken, LocationRouter);
ApiRouter.use("/job", verifyToken, JobRouter);

export default ApiRouter;
