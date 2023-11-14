import { Router, Request, Response, NextFunction } from "express";

const HomeRoute: Router = Router();

HomeRoute.use("/api", (req: Request, res: Response, next: NextFunction) => {
  res.json(<{ message: string }>{ message: "Api : Home" });
});

export default HomeRoute;
