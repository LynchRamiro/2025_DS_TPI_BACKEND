Backend - Microservicio Restaurant & Menú🛵
Descripción del Proyecto

Este proyecto es un componente clave de una plataforma integral de pedidos en línea, inspirada en servicios como PedidosYa. El microservicio implementado permite registrar, consultar, modificar y eliminar información relacionada con restaurantes y sus respectivos menús, dependiendo de los permisos que tenga el usuario. Desarrollado con Node.js, Typescript y TypeORM, se apoya en PostgreSQL para la gestión de datos y utiliza Docker para facilitar su despliegue y portabilidad.
Palabras clave

Docker
 PostgreSQL 
TypeORM 
Node.js 
REST API
 Microservicios
Mantenido por:

Lynch Ramonda Ramiro 
Pajón Valentino 
Rocha Vendivengo Gianella
Requisitos previos
Docker
 Node.js (v18+) 
PostgreSQL (usado vía Docker) 
VSCode (recomendado) 
Extensión de PostgreSQL para VSCode (opcional)
Servicios definidos
Base de datos PostgreSQL: La conexión con PostgreSQL se realiza a través de TypeORM en el archivo AppModule de NestJS.

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'mi_base_de_datos',
            username: 'postgres',
            password: 'mipassword',
            synchronize: true,
            entities
        }),
        TypeOrmModule.forFeature(entities),
        HttpModule,],
    controllers: [AppController, AddressController, CityController, LocationController, MenuController, RestaurantController],
    providers: [AppService, AddressService, CityService, LocationService, MenuService, RestaurantService],
})

Creación de Contenedor de Docker:
Docker run --name postgres-tpi -e POSTGRES_PASSWORD=mipassword -p 5432:5432 -d postgres
Creación de base de datos:

docker exec -it postgres-tpi  psql -U postgres 
CREATE DATABASE mi_base_de_datos;

Instructivo del proyecto

Instalación de dependencias: npm install 
Creación del contenedor y dentro del mismo la creación de la base de datos
Inicialización del proyecto Nestjs: npm run start



Endpoints disponibles
Restaurante 
POST → /restaurant → Crea un nuevo restaurante
 GET → /restaurant → Lista todos los restaurantes 
GET → /restaurant/:id → Obtiene los datos de un restaurante
GET → /restaurant/:id/menu → Obtiene todos los ítems del menú de un restaurante específico. PUT → /restaurant:id → Reemplaza completamente un restaurante 
PATCH → /restaurant/:id → Actualiza parcialmente un restaurante 
DELETE → /restaurant/:id → Elimina un restaurante

Menú 
POST → /menu → Crea un nuevo ítem del menú 
GET → /menu → Obtiene todos los ítems del menú 
GET → /menu/:id → Obtiene un ítem del menú 
PUT → /menu/:id → Reemplaza por completo los datos de un ítem del menú 
PATCH → /menu/:id → Actualiza parcialmente un ítem del menú 
DELETE → /menu/:id → Elimina un ítem del menú



Operaciones comunes con TypeORM

El sistema utiliza métodos estándar de TypeORM: Find, findOne, findBy, count Create, save, insert Update, merge, save Remove, delete, softRemove; para resolver la lógica de los endpoints descritos con anterioridad.

Estructura del proyecto

BACKEND/
├── node_modules/
├── src/
│ ├── address/ # Módulo de direcciones
│ ├── city/ # Módulo de ciudades
│ ├── entities/ # Entidades TypeORM
│ ├── location/ # Lógica relacionada con ubicaciones
│ ├── menu/ # Gestión del menú del restaurante
│ ├── middlewares/ # Middlewares personalizados
│ ├── restaurant/ # Módulo de restaurantes
│ ├── app.controller.ts # Controlador principal
│ ├── app.module.ts # Módulo raíz
│ ├── app.service.ts # Servicio principal
│ └── main.ts # Punto de entrada de la app
├── test/ # Pruebas unitarias
├── .gitignore
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── package-lock.json
├── tsconfig.build.json
└── tsconfig.json
Estructura de módulos
Cada módulo sigue la arquitectura de NestJS con sus respectivos:
controller.ts
service.ts
module.ts 
🔐 RemoteAuthGuard - Protección remota basada en permisos
Este guard (RemoteAuthGuard) se utiliza para proteger rutas en la API verificando permisos específicos de manera remota a través de un microservicio de autenticación/autorización.
Funcionamiento 
El guard intercepta cada solicitud y extrae el token de autorización desde el header Authorization. Si no hay token, lanza un error 401.
Utiliza el decorador @Permissions() para obtener los permisos requeridos por el handler (ruta). Por cada permiso, hace una llamada HTTP al servicio remoto de autenticación:
GET http://localhost:3000/can-do/{permission}
Acceso condicional:
Si todos los permisos requeridos son autorizados por el servicio externo, la solicitud continúa.
Si alguno falla, lanza un error 403


Paginación simple

En este proyecto, los endpoints que utilizan el decorador @Get() implementan un sistema de paginación simple mediante parámetros de consulta en la URL. Los métodos GET que devuelven listas (como restaurantes o menús) aceptan dos parámetros opcionales: page, que indica el número de página a consultar (por defecto es 1), y quantity, que define la cantidad de resultados por página (por defecto es 10).
Diagrama de Entidad-Relación utilizado