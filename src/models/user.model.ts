import {
  CreationOptional,
  DataTypes,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import sequelize from "../db/connexion.db";
import { Json } from "sequelize/types/utils";
import Role from "./role.model";
import Skill from "./skill.model";
import Job from "./job.model";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare user_id: string;
  declare f_name: string;
  declare l_name: string;
  declare telephone: Json;
  declare email: string;
  declare password: string;

  declare setRoles: HasManySetAssociationsMixin<Role, Role>;
  declare setSkills: HasManySetAssociationsMixin<Skill, Skill>;

  declare getRoles: HasManyGetAssociationsMixin<Role>;
  declare getSkills: HasManyGetAssociationsMixin<Skill>;

  declare createJob: HasManyCreateAssociationMixin<Job, "poster_id">;

  declare Roles: NonAttribute<Role[]>;
}

User.init(
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    f_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    l_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telephone: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    sequelize,
  }
);

export default User;
