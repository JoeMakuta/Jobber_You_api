import { Router, Request, Response, NextFunction } from "express";
import JobController from "../controllers/job.controller";

const JobRouter: Router = Router();

JobRouter.get("/", JobController.getAll);
JobRouter.post("/", JobController.add);
JobRouter.get("/:location_id", JobController.getOne);
JobRouter.put("/:location_id", JobController.updateOne);
JobRouter.delete("/:location_id", JobController.deleteOne);

export default JobRouter;
