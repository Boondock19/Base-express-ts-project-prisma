
## Pasos a seguir para ejecutarlo

1. Ejecutar `npm install` para instalar las dependencias
2. Agregar el archivo .env con las mismas variables que se encuentra en el .env.example .
    Recuerde agregar su cadena de conexion de MongoDB y su clase secreta para un JWT.
3. Ejecutar `npm run dev` para iniciar el servidor
    Este comando ejecutara el servidor con nodemon y concurrently para ejecutar  el backend y que tome 
    los cambios de los archivos ts.

si desea ejecutarlo en produccion ejecute `npm run build` y luego `npm run start`


En los archivos que se encuentran en el repositorio se encuentra la coleccion de postman para probar los endpoints.

El codigo se encuentra documentado para que sea mas facil de entender.

Cualquier duda por favor ponerse en contacto conmigo al correo: josematiasgonzalez20@gmail.com
