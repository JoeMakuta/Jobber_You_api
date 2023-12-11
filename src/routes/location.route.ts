import { Router, Request, Response, NextFunction } from "express";
import LocationController from "../controllers/location.controller";

const LocationRouter: Router = Router();

LocationRouter.get("/", LocationController.getAll);
LocationRouter.post("/", LocationController.add);
LocationRouter.get("/:location_id", LocationController.getOne);
LocationRouter.put("/:location_id", LocationController.updateOne);
LocationRouter.delete("/:location_id", LocationController.deleteOne);

export default LocationRouter;
