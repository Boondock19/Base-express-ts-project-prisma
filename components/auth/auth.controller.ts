import { Response, Request } from 'express';
import { authService } from './auth.service';

/**
 * Archivo destinado a manejar la entrada y salida de datos de la API de Auth.
 */

/**
 * Funcion encargada de manejar el signin de un usuario.
 * @param req request de express
 * @param res response de express
 * @returns retorna al usuario que se logueo y el token
 */

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (username === undefined || password === undefined) {
      throw new Error('Faltan datos necesarios para el signin');
    }

    const signinResponse = await authService.loginUser({ username, password });

    return res.status(200).json({
      msg: 'Success',
      user: signinResponse?.foundUser,
      token: signinResponse?.token,
    });
  } catch (error: any) {
    console.log(error);

    return res.status(400).json({
      msg: error.message,
    });
  }
};

/**
 * Funcion encargada de manejar el signout de un usuario.
 * @param req request de express
 * @param res response de express
 * @returns Retorna el usuario que se deslogueo, nuevamente
 * al no tener una especificacion, devuelvo al usuario para facilitar
 * la verificacion del cambio de estado, pero se puede devolver una respuesta
 * positiva sin informacion del usuario.
 */
export const signoutUser = async (req: Request, res: Response) => {
  try {
    const id = req.id;

    if (!id) {
      throw new Error('Faltan datos necesarios para el signout');
    }

    const signoutResponse = await authService.logoutUser(id);

    if (!signoutResponse) throw new Error('Usuario no existe');

    return res.status(200).json({
      msg: 'Success',
      user: signoutResponse,
    });
  } catch (error: any) {
    console.log(error);

    return res.status(400).json({
      msg: error.message,
    });
  }
};

export const authController = {
  signinUser,
  signoutUser,
};
