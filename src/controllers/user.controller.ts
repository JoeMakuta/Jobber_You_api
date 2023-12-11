import { NextFunction, Response, Request } from "express";
import User from "../models/user.model";
import { IServerResponse } from "../@types/response.type";
import * as httpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Role from "../models/role.model";
import Skill from "../models/skill.model";
import { convertToLowerRmvSpace } from "../helpers/helper";
dotenv.config();

const { TOKEN_SECRET, TOKEN_EXPIRES_IN } = process.env;

export default class UserController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const Response = await User.findAll({
        include: [
          { model: Role, through: { attributes: [] } },
          { model: Skill, through: { attributes: [] } },
        ],
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

  public static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        email,
        roles,
        skills,
      }: { email: string; roles: string[]; skills: string[] } = req.body;
      if (!email) {
        throw new httpError.BadRequest();
      }
      if (!roles[0]) {
        throw new httpError.BadRequest("At least one role must be specified");
      }
      const userExist = await User.findOne({ where: { email: email } });
      if (userExist) {
        throw new httpError.Conflict(
          "This email already has an active account !"
        );
      }

      const newRoles: Role[] = [];
      roles.forEach(async (role) => {
        const hh = await Role.findOne({ where: { role_name: role } });
        if (hh) newRoles.push(hh);
      });

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

      const salt: string = await bcrypt.genSalt(10);
      const password: string = await bcrypt.hash(req.body.password, salt);

      const Response = await User.create({
        ...req.body,
        password,
      });

      Response.setRoles(newRoles);
      Response.setSkills(newSkills);

      if (Response) {
        res.json(<IServerResponse>{
          message: "User created successfully",
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
    const { user_id } = req.params;
    try {
      const Response = await User.findByPk(user_id, {
        include: [
          { model: Role, through: { attributes: [] } },
          { model: Skill, through: { attributes: [] } },
        ],
      });
      if (Response) {
        res.json(<IServerResponse>{
          message: "Success",
          data: Response,
          error: null,
          status: 200,
        });
      } else {
        throw new httpError.NotFound("User not found");
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
    const { user_id } = req.params;
    const { roles, skills }: { roles: string[]; skills: string[] } = req.body;
    try {
      const Response = await User.findByPk(user_id);
      if (!Response) {
        throw new httpError.NotFound();
      }

      const salt: string = await bcrypt.genSalt(10);
      const password: string = await bcrypt.hash(req.body.password, salt);

      const newRoles: Role[] = [];
      roles.forEach(async (role) => {
        const hh = await Role.findOne({ where: { role_name: role } });
        if (hh) newRoles.push(hh);
      });

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
        ...{ ...req.body, password },
      });

      ResponseUpdate.setRoles(newRoles);
      ResponseUpdate.setSkills(newSkills);

      if (ResponseUpdate) {
        res.json(<IServerResponse>{
          message: "User updated successfully",
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
    const { user_id } = req.params;
    try {
      const Response = await User.findByPk(user_id);
      if (!Response) {
        throw new httpError.NotFound();
      }
      await Response?.destroy();
      res.json(<IServerResponse>{
        message: "User deleted successfully",
        data: Response,
        error: null,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await User.findOne({
        where: { email: req.body.email },
      });
      if (response) {
        const matched = await bcrypt.compare(
          req.body.password,
          response.dataValues.password
        );
        if (matched) {
          let token = jwt.sign(
            // Payload that will be returned when verifying the token
            {
              id: response.dataValues.user_id,
              email: response.dataValues.email,
            },
            TOKEN_SECRET as string,
            {
              expiresIn: TOKEN_EXPIRES_IN,
            }
          );
          res.status(200).json(<IServerResponse>{
            status: 200,
            message: "Logged in successfully !",
            data: { token, ...response.dataValues },
            error: null,
          });
        } else {
          throw new httpError.Unauthorized("Incorrect email or password !");
        }
      } else {
        throw new httpError.NotFound("Incorrect email or password !");
      }
    } catch (error) {
      next(error);
    }
  }
}
