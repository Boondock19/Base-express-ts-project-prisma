import { passwordEncrypt } from '../../helpers/passwordEncrypt';
import mongoose from 'mongoose';
import { User, UserDocument } from '../../models/user';
import { TCreateUserInput, TUserSchema } from './user.dto';

// Necesitamos esta constante para poder hacer cast de un string a un ObjectId de mongo.
const ObjectId = mongoose.Types.ObjectId;

/**
 * Funcion encargada de manejar la verificacion de los datos en la DB.
 * Si todo esta bien, se crea el usuario y se guarda en la DB.
 * @param username nombre del usuario
 * @param email email del usuario
 * @param password contraseña del usuario
 * @returns al usuario creado en la base de datos.
 */

export const saveUser = async (
  data: TCreateUserInput
): Promise<UserDocument> => {
  const { username, email, password } = data;
  try {
    // Verificar que el usuario no exista en DB.
    // Buscar el user por email que es unico
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      throw new Error('El usuario ya existe');
    }

    // Encriptar contraseña
    const passwordEncrypted = passwordEncrypt(password);

    // Crear usuario
    const user = new User({ username, email, password: passwordEncrypted });

    // Guardar en DB

    await user.save();

    return user;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * De momento esta funcion es utulizada por la ruta de currentuser,
 * pero se puede reutilizar para obtener a un usuario por su ID con
 * otra ruta.
 * Funcion encargarda de obtener a un usuario por su id
 * @param id id del usuario
 * @returns al susuario encontrado
 */
export const getUserById = async (id: string) => {
  try {
    if (!id) throw new Error('El id es requerido');

    const foundUser = await User.findById(id);

    if (!foundUser) throw new Error('El usuario no existe');

    return foundUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 *
 * @param page pagina que se quiere obtener
 * @param limit cuantos registros se quieren obtener
 * @returns un objeto con los valores de la paginacion (total de usuaruos) y los usuarios encontrados segun el limit
 */

export const getUsers = async (page: number, limit: number) => {
  try {
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalUsers = await User.countDocuments();
    return { users, totalUsers };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const userService = {
  saveUser,
  getUserById,
  getUsers,
};
