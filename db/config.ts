import mongoose, { Mongoose, ConnectOptions } from "mongoose";

/**
 * Configuracion de la base de datos con el ORM mongoose
 */

export const dbConection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN || "");

    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la BD");
  }
};
