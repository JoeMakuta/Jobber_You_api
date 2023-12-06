import { Router, Request, Response, NextFunction } from "express";
import JobController from "../controllers/job.controller";
import roleGuard from "../middlewares/roleGuard";

const JobRouter: Router = Router();

JobRouter.get("/", JobController.getAll);
JobRouter.post("/", roleGuard, JobController.add);
JobRouter.get("/search", JobController.search);
JobRouter.get("/:job_id", JobController.getOne);
JobRouter.put("/:job_id", roleGuard, JobController.updateOne);
JobRouter.delete("/:job_id", roleGuard, JobController.deleteOne);

export default JobRouter;
