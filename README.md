Hito 3 Desarrollo back end

En el archivo script.sql se encuentra el codigo sql para crear la base de datos, tablas y elementos de ejemplo ( el puerto de la base datos es 5433)

El puerto del localhost es el 3000

Para levantar el desarrrollo Se requiere ejecutar en terminal : node index.js

Se requiere ejecutar en terminal : node index.js

Revisar en la rama "develop"

Se desarrollaron los siguientes endpoints

USUARIOS:

- POST /login
- POST /usuarios
- GET /usuarios

PRODUCTOS

- GET /productos
- POST /productos
- PUT /productos/:id
- DELETE /productos/:id
- GET /productos/:id

Para el testing se consideraron las siguientes pruebas:

- Obteniendo un 200 y Obteniendo productos en un arreglo
- Eliminando un producto que no existe
- Agregando un nuevo producto
- Editando un producto existente

  Para realizar la prueba se requiere ejecutar en terminal: npm run test

Nota: se utilizó un token generico de prueba
