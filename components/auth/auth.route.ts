import { Router } from 'express';
import { authController } from './auth.controller';
import { validateJWT } from '../../middlewares/validateJWT';

/**
 * Achivo destinado a manejar las rutas de api para Auth.
 */

/**
 * Esta declaracion es necesaria para poder agregar el id del usuario al request en express
 */
declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const router: Router = Router();

/**
 * Ruta para iniciar sesion.
 */

router.post('/signin', authController.signinUser);

/**
 * Ruta para cerrar sesion.
 */
router.post('/signout', validateJWT, authController.signoutUser);

export default router;
