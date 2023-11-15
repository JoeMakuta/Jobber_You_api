import { NextFunction, Response, Request } from "express";

export default class HomeApi {
  public static async Home(req: Request, res: Response, next: NextFunction) {
    res.json(<{ message: string }>{ message: "Api : Home" });
  }
}
