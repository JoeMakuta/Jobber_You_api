import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUserRequest } from "../@types/request.type";
import * as httpError from "http-errors";
import { Model } from "sequelize";
import { IPayLoad } from "../@types/request.type";
import User from "../models/user.model";
import Role from "../models/role.model";
import Skill from "../models/skill.model";

const verifyToken = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { TOKEN_SECRET } = process.env;
  try {
    const token: string = req.headers.authorization?.split(" ")[1] as string;
    const { id, email }: IPayLoad = jwt.verify(
      token,
      TOKEN_SECRET as string
    ) as IPayLoad;

    const user = await User.findByPk(id, { include: [Role, Skill] });

    if (user) {
      req.auth = user;
      next();
    } else throw new httpError.Forbidden("Invalid Token");
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
