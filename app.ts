import { Server } from "./models/server";
import dotenv from "dotenv";

dotenv.config();

/**
 * Archivo principal de la API, encargada de instanciar a la clase Sever para
 * iniciar el servidor.
 */

const server = new Server();

server.listen();
