import { Router, Request, Response, NextFunction } from "express";
import Role from "../controllers/role.controller";

const RoleRouter: Router = Router();

RoleRouter.get("/", Role.getAll);
RoleRouter.post("/", Role.add);
RoleRouter.get("/:role_id", Role.getOne);
RoleRouter.put("/:role_id", Role.updateOne);
RoleRouter.delete("/:role_id", Role.deleteOne);

export default RoleRouter;
