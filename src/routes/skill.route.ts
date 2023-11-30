import { Router, Request, Response, NextFunction } from "express";
import Skill from "../controllers/skill.controller";

const SkillRouter: Router = Router();

SkillRouter.get("/", Skill.getAll);
SkillRouter.post("/", Skill.add);
SkillRouter.get("/:skill_id", Skill.getOne);
SkillRouter.put("/:skill_id", Skill.updateOne);
SkillRouter.delete("/:skill_id", Skill.deleteOne);

export default SkillRouter;
