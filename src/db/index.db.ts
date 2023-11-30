import sequelize from "./connexion.db";
import "../models/index.model";
import "../db/relations.db";
import DefaultDataService from "../controllers/default.controller";

const dbconnexion = async () => {
  try {
    // await sequelize.sync({ force: true });
    const sync = await sequelize.sync({ alter: true });
    if (sync) {
      DefaultDataService.addAllDefaultData();
    }
    // await sequelize.sync();
    console.log("Successfull Db Sync and Connexion !");
  } catch (error: any) {
    console.log("DB Connexion failed!", error?.message);
  }
};

export default dbconnexion;
