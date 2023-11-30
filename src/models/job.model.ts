import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../db/connexion.db";
import { UUID } from "crypto";
import { Json } from "sequelize/types/utils";

class Job extends Model<InferAttributes<Job>, InferCreationAttributes<Job>> {
  declare job_id: string;
  declare poster_id: Json;
  declare job_title: string;
  declare job_description: string;
  declare salary_range: string;
  declare posting_date: Date;
  declare closing_date: Date;
  declare skills: Json;
  declare location: Json;
}

Job.init(
  {
    job_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    poster_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary_range: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posting_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    closing_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    skills: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    location: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "job",
    sequelize,
  }
);

export default Job;
