// import "../models/index.model";
// import PoliceAgentModel from "../models/policeAgent.model";
// import PoliceAgent from "../controllers/policeAgent.controller";
import sequelize from "./connexion.db";

const dbconnexion = async () => {
  try {
    // await sequelize.sync({ alter: true });
    await sequelize.sync();
    console.log("Successfull Db Sync and Connexion !");
  } catch (error: any) {
    console.log("DB Connexion failed!", error?.message);
  }
};

export default dbconnexion;
