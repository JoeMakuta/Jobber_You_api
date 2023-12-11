import { NextFunction, Response, Request } from "express";
import User from "../models/user.model";
import { IServerResponse } from "../@types/response.type";
import * as httpError from "http-errors";
import Skill from "../models/skill.model";
import { convertToLowerRmvSpace } from "../helpers/helper";
import Job from "../models/job.model";
import Location from "../models/location.model";
import { IUserRequest } from "../@types/request.type";
import { Op } from "sequelize";

export default class JobController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const Response = await Job.findAll();
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

  public static async add(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        location,
        skills,
      }: { location: "remote" | "on-site" | "hybrid"; skills: string[] } =
        req.body;

      if (!location) {
        throw new httpError.BadRequest(
          "At least one location must be specified"
        );
      }

      const job_location = await Location.findOne({
        where: { location_name: location },
      });
      if (!job_location) {
        throw new httpError.NotFound("Location not found");
      }

      const newSkills: Skill[] = [];
      skills.forEach(async (skill) => {
        const skillExists = await Skill.findOne({
          where: { skill_name: skill },
        });
        if (skillExists) newSkills.push(skillExists);
        else {
          const newSkillName = convertToLowerRmvSpace(skill);
          const newSkill = await Skill.create({
            ...{ skill_name: newSkillName },
          });
          newSkills.push(newSkill);
        }
      });

      const job_user: User = req.auth;

      const Response = await job_user.createJob({
        ...req.body,
      });

      Response.setSkills(newSkills);
      Response.setLocations([job_location]);

      if (Response) {
        res.json(<IServerResponse>{
          message: "Job created successfully",
          data: Response,
          error: null,
          status: 200,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public static async updateOne(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    const { job_id } = req.params;
    const {
      location,
      skills,
    }: { location: "remote" | "on-site" | "hybrid"; skills: string[] } =
      req.body;

    try {
      const Response = await Job.findByPk(job_id);
      if (!Response) {
        throw new httpError.NotFound();
      }

      const job_location = await Location.findOne({
        where: { location_name: location },
      });
      if (!job_location) {
        throw new httpError.NotFound("Location not found");
      }

      const newSkills: Skill[] = [];
      skills.forEach(async (skill) => {
        const skillExists = await Skill.findOne({
          where: { skill_name: skill },
        });
        if (skillExists) newSkills.push(skillExists);
        else {
          const newSkillName = convertToLowerRmvSpace(skill);
          const newSkill = await Skill.create({
            ...{ skill_name: newSkillName },
          });
          newSkills.push(newSkill);
        }
      });

      const ResponseUpdate = await Response?.update({
        ...Response,
        ...req.body,
      });

      Response.setSkills(newSkills);
      Response.setLocations([job_location]);

      if (ResponseUpdate) {
        res.json(<IServerResponse>{
          message: "Job updated successfully",
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
    const { job_id } = req.params;
    try {
      const Response = await Job.findByPk(job_id);
      if (Response) {
        res.json(<IServerResponse>{
          message: "Success",
          data: Response,
          error: null,
          status: 200,
        });
      } else {
        throw new httpError.NotFound("Job not found");
      }
    } catch (error) {
      next(error);
    }
  }

  public static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { search } = req.query;
      let search_key = search?.toString();
      search_key = search_key?.toLocaleLowerCase()

      const Response = await Job.findAll({
        where: {
          [Op.or]: [
            {
              job_title: {
                [Op.substring]: search?.toString().toLowerCase(),
              },
            },
            {
              job_description: {
                [Op.substring]: search?.toString().toLowerCase(),
              },
            },
          ],
        },
      });

      if (Response) {
        res.json(<IServerResponse>{
          message: "Success",
          data: Response,
          error: null,
          status: 200,
        });
      } else {
        throw new httpError.NotFound("Job not found");
      }
    } catch (error) {
      next(error);
    }
  }

  public static async deleteOne(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    const { job_id } = req.params;
    try {
      const Response = await Job.findByPk(job_id);
      if (!Response) {
        throw new httpError.NotFound();
      }
      await Response?.destroy();
      res.json(<IServerResponse>{
        message: "Job deleted successfully",
        data: Response,
        error: null,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
}
