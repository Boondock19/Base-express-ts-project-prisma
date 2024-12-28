import bcrypt from "bcrypt";

// Funcion para encriptar la contraseña
export const passwordEncrypt = (password: string) => {
  const saltRounds = 10;

  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(password, salt);

  return passwordHash;
};

// Funcion para comparar la contraseña ingresada con la contraseña encriptada
// retorna un valor booleano true si son iguales, false si no lo son
export const comparePassword = (password: string, passwordHash: string) => {
  return bcrypt.compareSync(password, passwordHash);
};
