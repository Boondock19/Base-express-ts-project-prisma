import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

/**
 * Por alguna razon que desconozco dotenv me esta forzando a hacer el cargado
 * de las variables de entorno en este archivo, si no lo hago, no logra encontrar
 * a la variable de entorno SECRET_KEY
 */

dotenv.config();

const secretKey = process.env.SECRET_KEY || "";
const jwt = jsonwebtoken;

// Funcion para crear un jwt en base a un payload, en este caso es solo el id
export const generateJWT = (payload: string) => {
  const token = jwt.sign({ id: payload }, secretKey, { expiresIn: "6h" });

  return token;
};
