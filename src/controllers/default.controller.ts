import { NextFunction, Response, Request } from "express";
import Role from "../models/role.model";
import * as httpError from "http-errors";
import Skill from "../models/skill.model";
import User from "../models/user.model";
import * as bcrypt from "bcrypt";

import * as dotenv from "dotenv";

dotenv.config();

const { DEFAULT_USER, DEFAULT_ROLES, DEFAULT_SKILLS } = process.env;

export default class DefaultDataService {
  public static async addAllDefaultData() {
    try {
      const RoleResponse = await Role.findAll();
      if (!RoleResponse[0]) {
        JSON.parse(DEFAULT_ROLES as string).forEach(async (role: string) => {
          await Role.create({
            role_name: role,
          });
        });
      }

      const SkillResponse = await Skill.findAll();
      if (!SkillResponse[0]) {
        JSON.parse(DEFAULT_SKILLS as string).forEach(async (skill: string) => {
          await Skill.create({
            skill_name: skill,
          });
        });
      }

      const UserResponse = await User.findAll();
      if (!UserResponse[0]) {
        const body = JSON.parse(DEFAULT_USER as string);
        const { roles, skills } = body;

        const newRoles: Role[] = [];
        roles.forEach(async (role: string) => {
          const hh = await Role.findOne({ where: { role_name: role } });
          if (hh) newRoles.push(hh);
        });

        const newSkills: Skill[] = [];
        skills.forEach(async (skill: string) => {
          const skillExists = await Skill.findOne({
            where: { skill_name: skill },
          });
          if (skillExists) newSkills.push(skillExists);
        });

        const salt: string = await bcrypt.genSalt(10);
        const password: string = await bcrypt.hash(body.password, salt);

        const Response = await User.create({
          ...body,
          password,
        });

        await Response.setRoles(newRoles);
        await Response.setSkills(newSkills);
      }

      console.log("Default Data Added");
    } catch (error) {
      console.log("Error when adding default data : ", error);
    }
  }
}
