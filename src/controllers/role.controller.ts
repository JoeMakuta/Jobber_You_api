import { NextFunction, Response, Request } from "express";
import Role from "../models/role.model";
import { IServerResponse } from "../@types/response.type";
import * as httpError from "http-errors";

export default class RoleController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const Response = await Role.findAll();
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
      const Response = await Role.create({
        ...req.body,
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
    const { role_id } = req.params;
    try {
      const Response = await Role.findByPk(role_id);
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
    const { role_id } = req.params;
    try {
      const Response = await Role.findByPk(role_id);
      if (!Response) {
        throw new httpError.NotFound();
      }

      const ResponseUpdate = await Response?.update({
        ...Response,
        ...req.body,
      });

      if (ResponseUpdate) {
        res.json(<IServerResponse>{
          message: "Role updated successfully",
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
    const { role_id } = req.params;
    try {
      const Response = await Role.findByPk(role_id);
      if (!Response) {
        throw new httpError.NotFound();
      }
      await Response?.destroy();
      res.json(<IServerResponse>{
        message: "Role deleted successfully",
        data: Response,
        error: null,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
}
