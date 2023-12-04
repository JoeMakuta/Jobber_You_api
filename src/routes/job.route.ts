import { Router, Request, Response, NextFunction } from "express";
import JobController from "../controllers/job.controller";
import roleGuard from "../middlewares/roleGuard";

const JobRouter: Router = Router();

JobRouter.get("/", JobController.getAll);
JobRouter.post("/", roleGuard, JobController.add);
JobRouter.get("/:job_id", JobController.getOne);
JobRouter.put("/:job_id", JobController.updateOne);
JobRouter.delete("/:job_id", JobController.deleteOne);

export default JobRouter;
