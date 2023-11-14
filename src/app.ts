import express from "express";
import * as http from "http";
import * as dotenv from "dotenv";
import ExpressError from "./middlewares/error";
import NotFoundError from "./middlewares/notFound";
import dbconnexion from "./db/index.db";
import cors from "cors";
import HomeRoute from "./routes/index.route";

dotenv.config();

export default class App {
  app: express.Application = express();
  server: http.Server = http.createServer(this.app);
  public async init() {
    await dbconnexion();
    await this.middlewares();
    return Promise.resolve();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use("/", HomeRoute);
    this.app.use(NotFoundError.errorHandler);
    this.app.use(ExpressError.errorHandler);
  }
}
