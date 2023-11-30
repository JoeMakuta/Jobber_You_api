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

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare user_id: string;
  declare f_name: string;
  declare l_name: string;
  declare user_name: string;
  declare telephone: Json;
  declare email: string;
  declare password: string;
  declare roles: Json;
  declare skills: Json;
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
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

    roles: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    skills: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "user",
    sequelize,
  }
);

export default User;
