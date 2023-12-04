import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../db/connexion.db";
import { UUID } from "crypto";
import { Json } from "sequelize/types/utils";
import User from "./user.model";
import Skill from "./skill.model";
import Location from "./location.model";

class Job extends Model<InferAttributes<Job>, InferCreationAttributes<Job>> {
  declare job_id: string;
  declare job_title: string;
  declare job_description: string;
  declare salary_range: string;
  declare posting_date: Date;
  declare closing_date: Date;
  declare skills: Json;
  declare location: Json;

  declare poster_id: ForeignKey<User["user_id"]>;

  declare setLocations: HasManySetAssociationsMixin<Location, Location>;
  declare setSkills: HasManySetAssociationsMixin<Skill, Skill>;
}

Job.init(
  {
    job_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
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
