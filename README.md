# Proyecto de Gestión de Usuarios y Productos


Este proyecto es una aplicación web de gestión de productos desarrollada con un frontend en React y un backend en C# utilizando ASP.NET Core. La aplicación permite a los administradores gestionar productos, incluyendo la edición, eliminación y búsqueda de productos tanco como gestionar usuarios.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)

## Características

- Gestión de productos:
  - Añadir, editar y eliminar productos.
  - Paginación y búsqueda de productos.
- Gestión de usuarios:
  - Añadir, editar y eliminar usuarios.
  - Paginación y búsqueda de usuarios.
  - Control de acceso basado en roles (admin y usuarios comunes).
- Autenticación y autorización con JWT.

## Tecnologías

- **Frontend**: React, Material-UI, Formik, Axios
- **Backend**: ASP.NET Core, Entity Framework Core, SQL Server
- **Base de datos**: SQL Server
- **Contenedores**: Docker, Docker Compose

## Configuración

### Requisitos previos

- Docker y Docker Compose instalados.

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:

\`\`\`env
# Base de datos
ACCEPT_EULA=Y
MSSQL_SA_PASSWORD=YourStrongPassword
MSSQL_PID=Developer

# Ejemplo de contraseña hash: pruebaadmin123 → AQAAAAIAAYagAAAAEHoS9P6Q45objK4OBG961dnl7VtDHBC+OWoOg6NZU4SgOObrlxSDBY75V0sqUjdmMg==
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=hashedPassword
ADMIN_EMAIL=admin@example.com

# Backend
ASPNETCORE_ENVIRONMENT=Development
DB_CONNECTION_STRING=Server=db;Database=almacen;User Id=sa;Password=YourStrongPassword;


## Ejecución

1. **Clonar el repositorio**:

   \`\`\`bash
   git clone https://github.com/Kirisugex/almacenCRUD.git
   cd tu-repositorio
   \`\`\`

2. **Construir y ejecutar los contenedores**:

   \`\`\`bash
   docker-compose up --build
   \`\`\`

3. **Acceder a la aplicación**:

   - Frontend: `http://localhost:3000`
   - Backend: `[http://localhost:5002/](http://localhost:5002/swagger/index.html)` [Documentación API]

## Estructura del Proyecto

\`\`\`
almacenCRUD/
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   ├── Program.cs
│   ├── Startup.cs
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   ├── Dockerfile
│   └── ...
├── database/
│   ├── Dockerfile
│   └── init.sql
├── .env
├── docker-compose.yml
└── README.md
\`\`\`
