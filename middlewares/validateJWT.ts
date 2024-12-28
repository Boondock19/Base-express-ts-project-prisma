import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction, response } from 'express';

import dotenv from 'dotenv';
import { z } from 'zod';
import { prisma } from '../db/prismaClient';

/**
 * Por alguna razon que desconozco dotenv me esta forzando a hacer el cargado
 * de las variables de entorno en este archivo, si no lo hago, no logra encontrar
 * a la variable de entorno SECRET_KEY
 */

dotenv.config();

// Interfaz para darle tipado al payload del jwt

const jwtPayload = z.object({
  id: z.number(),
});

type TJwtPayload = z.infer<typeof jwtPayload>;
// const ObjectId = mongoose.Types.ObjectId
const secretKey = process.env.SECRET_KEY || '';

/**
 * Funcion encargada de validar el token del usuario
 * y en caso positivo agregar el valor de id al request
 * @param req request de express con el atributo id agregado
 * @param res response de express
 * @param next next de express
 * @returns
 */

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('x-token');
  const jwt = jsonwebtoken;

  if (!token) {
    return res.status(401).json({
      status: 'error',
      msg: 'No hay token en la petición',
    });
  }

  try {
    // Limpiamos el token
    const cleanToken = token.replace('Bearer ', '');

    // Tomamos el ID del payload
    const payload = jwt.verify(cleanToken, secretKey) as TJwtPayload;

    //Buscamos al usuario en la DB

    const foundUser = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!foundUser) {
      throw new Error('Usuario no encontrado');
    }

    // Agregamos el ID al request
    req.id = payload.id;

    next();
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      if (error.message === 'jwt expired') {
        return res.status(401).json({
          status: 'error',
          msg: 'Token expirado',
        });
      }
    }
    return res.status(401).json({
      status: 'error',
      msg: 'Token no válido',
    });
  }
};
