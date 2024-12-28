import { Request, Response, NextFunction } from "express";
import { body, param, query, validationResult } from "express-validator";

/**
 * Archivo destinado a manejar las validaciones de los datos ingresados
 * para las rutas de User
 */

export const userCreateValidator = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isString()
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage("Name must be 3 to 12 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isString()
    .trim()
    .isLength({ min: 0, max: 124 })
    .isEmail()
    .withMessage("Is not a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .trim()
    .isLength({ min: 6, max: 12 })
    .withMessage("Password must be 6 to 12 characters"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ status: "error", errors });
    }
    next();
  },
];

export const userGetPaginationsValidator = [
  query("page")
    .notEmpty()
    .withMessage("page is required")
    .toInt()
    .isInt({ min: 1 })
    .withMessage("page must be greater than 0"),
  query("limit")
    .notEmpty()
    .withMessage("limit is required")
    .toInt()
    .isNumeric()
    .withMessage("limit must be a number"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ status: "error", errors });
    }
    next();
  },
];
