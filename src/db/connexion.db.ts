import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_URI, DB_HOST } = process.env;

const sequelize: Sequelize = new Sequelize(DB_URI as string, {
  host: DB_HOST,
  dialect: "postgres",
});

export default sequelize;
