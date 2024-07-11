# Entrega Final Backend

Este proyecto es la entrega final para el curso de Backend I. Es una aplicación de backend construida con Node.js, Express y MongoDB.

## Requisitos

- Node.js
- MongoDB

## Instalación

1. Clona el repositorio: 

```bash

    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_REPOSITORIO>
```

2. Instala las dependencias:

```bash
    npm install
    pnpm add
    yarn install
```

3. Configura la base de datos MongoDB en el archivo `src/config/mongoDB.config.js`.

## Scripts

- Iniciar el servidor en modo desarrollo:
```bash
    npm run dev
    pnpm dev
    yarn dev
```

## Estructura del Proyecto

- `src/app.js`: Archivo principal de la aplicación.
- `src/routes`: Contiene las rutas de la API y las vistas.
- `src/dao`: Contiene los Data Access Objects (DAO) para interactuar con la base de datos.
- `src/views`: Contiene las vistas renderizadas con Handlebars.
- `public/js`: Contiene los archivos JavaScript para el frontend.

## Rutas de la API

### Carritos

- **POST** `/api/carts/`
    - Crea un nuevo carrito.
- **GET** `/api/carts/:cid`
    - Obtiene un carrito por su ID.
- **POST** `/api/carts/:cid/product/:pid`
    - Agrega un producto al carrito.
- **DELETE** `/api/carts/:cid/product/:pid`
    - Elimina un producto del carrito.
- **PUT** `/api/carts/:cid/product/:pid`
    - Actualiza la cantidad de un producto en el carrito.
- **DELETE** `/api/carts/:cid`
    - Elimina todos los productos del carrito.
### Productos

- **GET** `/api/products/`
    - Obtiene todos los productos con opciones de paginación y filtrado.
- **GET** `/api/products/:pid`
    - Obtiene un producto por su ID.
- **POST** `/api/products/`
    - Crea un nuevo producto.
- **PUT** `/api/products/:pid`
    - Actualiza un producto por su ID.
- **DELETE** `/api/products/:pid`
    - Elimina un producto por su ID.
## Vistas

- **Home**: Muestra una lista de productos.
- **RealTimeProducts**: Permite agregar y eliminar productos en tiempo real.
## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para obtener más detalles.

```python
print('Código solo para uso del trabajo final de Backend por Coderhouse')
```