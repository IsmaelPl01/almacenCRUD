# Proyecto de Gestión de Usuarios y Productos

Este proyecto es una aplicación web de gestión de usuarios y productos desarrollada con un frontend en React y un backend en C# utilizando ASP.NET Core. La aplicación permite a los administradores gestionar productos y usuarios, incluyendo la edición, eliminación y búsqueda de registros.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribución](#contribución)
- [Licencia](#licencia)

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

```env
# Base de datos
ACCEPT_EULA=Y
MSSQL_SA_PASSWORD=YourStrongPassword
MSSQL_PID=Developer
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=hashedPassword
ADMIN_EMAIL=admin@example.com

# Backend
ASPNETCORE_ENVIRONMENT=Development
DB_CONNECTION_STRING=Server=db;Database=almacen;User Id=sa;Password=YourStrongPassword;

# Frontend
REACT_APP_API_URL=http://localhost:5002/api
