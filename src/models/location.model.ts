import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../db/connexion.db";

class Location extends Model<
  InferAttributes<Location>,
  InferCreationAttributes<Location>
> {
  declare location_id: CreationOptional<Location>;
  declare location_name: string;
}

Location.init(
  {
    location_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    location_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "location",
    sequelize,
  }
);

export default Location;
