import sequelize from "./connexion.db";
import "../models/index.model";

const dbconnexion = async () => {
  try {
    // await sequelize.sync({ force: true });
    await sequelize.sync({ alter: true });
    // await sequelize.sync();
    console.log("Successfull Db Sync and Connexion !");
  } catch (error: any) {
    console.log("DB Connexion failed!", error?.message);
  }
};

export default dbconnexion;
