import { NextFunction, Response, Request } from "express";
import { IServerResponse } from "../@types/response.type";
import * as httpError from "http-errors";
import Location from "../models/location.model";
import { convertToLowerRmvSpace } from "../helpers/helper";

export default class LocationController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const Response = await Location.findAll();
      if (Response) {
        res.json(<IServerResponse>{
          message: "Success",
          data: Response,
          error: null,
          status: 200,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  public static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const { location_name }: { location_name: string } = req.body;

      const new_location = convertToLowerRmvSpace(location_name);
      const Response = await Location.create({
        location_name: new_location,
      });
      if (Response) {
        res.json(<IServerResponse>{
          message: "Success",
          data: Response,
          error: null,
          status: 200,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  public static async getOne(req: Request, res: Response, next: NextFunction) {
    const { location_id } = req.params;
    try {
      const Response = await Location.findByPk(location_id);
      if (Response) {
        res.json(<IServerResponse>{
          message: "Success",
          data: Response,
          error: null,
          status: 200,
        });
      } else {
        throw new httpError.NotFound();
      }
    } catch (error) {
      next(error);
    }
  }

  public static async updateOne(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { location_id } = req.params;
    try {
      const Response = await Location.findByPk(location_id);
      if (!Response) {
        throw new httpError.NotFound();
      }

      const ResponseUpdate = await Response?.update({
        ...Response,
        ...req.body,
      });

      if (ResponseUpdate) {
        res.json(<IServerResponse>{
          message: "Location updated successfully",
          data: Response,
          error: null,
          status: 200,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  public static async deleteOne(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { location_id } = req.params;
    try {
      const Response = await Location.findByPk(location_id);
      if (!Response) {
        throw new httpError.NotFound();
      }
      await Response?.destroy();
      res.json(<IServerResponse>{
        message: "Location deleted successfully",
        data: Response,
        error: null,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
}
