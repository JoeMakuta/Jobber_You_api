import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUserRequest } from "../@types/request.type";
import * as httpError from "http-errors";
import { IPayLoad } from "../@types/request.type";
import User from "../models/user.model";
import Role from "../models/role.model";
import Job from "../models/job.model";

const roleGuard = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const current_user: User = req.auth;

    const job_poster = await Role.findOne({
      where: { role_name: "job_poster" },
    });

    if (job_poster) {
      if (
        current_user.Roles.filter(
          (elt) => elt.dataValues.role_name == "job_poster"
        ).length > 0
      )
        next();
      else throw new httpError.Forbidden("You have no role to create a job");
    }
  } catch (error) {
    next(error);
  }
};

export default roleGuard;
