import { Response, Request } from 'express';
import { userService } from './user.service';
import { TCreateUserInput } from './user.dto';

/**
 * Archivo destinado a manejar la entrada y salida de datos de la API de User.
 */

/**
 * Funcion para obtener los usuarios de la base de datos
 * de manera paginada, solicitda de manera obligatoria
 * page y limit, page indica la pagina que se quiere obtener
 * y limit la cantidad de registros que se quieren obtener
 * @param req Request de express
 * @param res Response de express
 * @returns Devuelve una respuesta positiva con un objeto que contiene
 * a los usuarios obtenidos, la pagina actual, y el total de paginas
 */

export const userGet = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  try {
    if (page === undefined || limit === undefined) {
      throw new Error('Faltan datos necesarios para el obtener los usuarios');
    }

    const getUsersResponse = await userService.getUsers(
      Number(page),
      Number(limit)
    );

    if (!getUsersResponse) {
      throw new Error('Error al obtener los usuarios');
    }

    const { users, totalUsers } = getUsersResponse;

    res.json({
      msg: 'Success',
      users,
      totalPages: Math.ceil(totalUsers / Number(limit)),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return res.status(400).json({
        msg: error.message,
      });
  }
};

/**
 * Funcion para obtener al usuario actual que este logueado
 * en la app, se obtiene el id del usuario del token
 * @param req Request de express
 * @param res response de express
 * @returns  retorna una respuesta positiva con el usuario encontrado
 */

export const currentUserByIdGet = async (req: Request, res: Response) => {
  try {
    const id = req.id;
    if (!id) {
      throw new Error('No se encontro el id del usuario');
    }

    const userFound = await userService.getUserById(id);
    res.json({
      msg: 'Success',
      user: userFound,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return res.status(400).json({
        msg: error.message,
      });
  }
};

/**
 *  Funcion encargada de realizar el registro de un nuevo usuario
 * en el sistema, se solicita username, email y password
 * @param req request de express
 * @param res response de express
 * @returns retorna una respuesta positiva con el usuario creado.
 * Como no tenia especificaciones al respecto de que devolver en este caso,
 * decidi devolver el usuario creado, para facilidad al momento de verificar,
 * pero dependiendo de la logica del negocio, simplemente se podria devolver una
 * respuesta positiva indicando que se creo, pero sin informacion del usuario.
 */

export const userPost = async (req: Request, res: Response) => {
  try {
    const { username, email, password }: TCreateUserInput = req.body;
    if (
      username === undefined ||
      email === undefined ||
      password === undefined
    ) {
      throw new Error('Faltan datos necesarios para el registro');
    }

    const userResponse = await userService.saveUser({
      username,
      email,
      password,
    });

    if (!userResponse) {
      throw new Error('Error al guardar el usuario');
    }

    return res.status(201).json({
      msg: 'Success',
      user: userResponse,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return res.status(400).json({
        msg: error.message,
      });
  }
};

export const userController = {
  userGet,
  currentUserByIdGet,
  userPost,
};
