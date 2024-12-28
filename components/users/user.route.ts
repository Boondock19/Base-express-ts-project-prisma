import { Router } from 'express';
import { userController } from './user.controller';
import {
  userCreateValidator,
  userGetPaginationsValidator,
} from './user.validator';
import { validateJWT } from '../../middlewares/validateJWT';

/**
 * Archivo destinado a manejar las rutas de api para User.
 * Realize la validacion de los datos ingresados  o esperados
 * por los endpoints con express-validator, si es endpoint requiere
 * el uso de jwt, entonces se le pasa el middleware validateJWT para confirmar
 * que el jwt es valido y guardar el id del usuario en el request.
 */

export const router: Router = Router();
// get sin paginacion
router.get('/', userGetPaginationsValidator, userController.userGet);

router.get('/currentuser', validateJWT, userController.currentUserByIdGet);

router.post('/signup', userCreateValidator, userController.userPost);

export default router;
