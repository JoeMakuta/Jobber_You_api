import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../db/connexion.db";

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare role_id: CreationOptional<Role>;
  declare role_name: string;
}

Role.init(
  {
    role_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "role",
    sequelize,
  }
);

export default Role;
