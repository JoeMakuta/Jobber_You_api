import { NextFunction, Response, Request } from "express";
import Skill from "../models/skill.model";
import { IServerResponse } from "../@types/response.type";
import * as httpError from "http-errors";
import { convertToLowerRmvSpace } from "../helpers/helper";

export default class SkillController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const Response = await Skill.findAll();
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
      const { skill_name }: { skill_name: string } = req.body;
      if (!skill_name) {
        throw new httpError.BadRequest();
      }
      const newSkillName = convertToLowerRmvSpace(skill_name);
      const Response = await Skill.create({
        ...req.body,
        skill_name: newSkillName,
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
    const { skill_id } = req.params;
    try {
      const Response = await Skill.findByPk(skill_id);
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
    const { skill_id } = req.params;
    try {
      const Response = await Skill.findByPk(skill_id);
      if (!Response) {
        throw new httpError.NotFound();
      }

      const ResponseUpdate = await Response?.update({
        ...Response,
        ...req.body,
      });

      if (ResponseUpdate) {
        res.json(<IServerResponse>{
          message: "Skill updated successfully",
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
    const { skill_id } = req.params;
    try {
      const Response = await Skill.findByPk(skill_id);
      if (!Response) {
        throw new httpError.NotFound();
      }
      await Response?.destroy();
      res.json(<IServerResponse>{
        message: "Skill deleted successfully",
        data: Response,
        error: null,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
}
