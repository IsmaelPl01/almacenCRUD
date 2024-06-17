# Usar la imagen base de SQL Server
FROM mcr.microsoft.com/mssql/server:2022-latest

# Variables de entorno
ENV ACCEPT_EULA=Y
ENV MSSQL_SA_PASSWORD=StrongP@ssw0rd
ENV MSSQL_PID=Developer

# Cambiar al usuario root para crear el directorio y copiar los archivos
USER root

# Crear el directorio de scripts
RUN mkdir -p /usr/src/app

# Copiar el script SQL al contenedor
COPY init.sql /usr/src/app

# Copiar el script de inicialización
COPY entrypoint.sh /usr/src/app

# Establecer el script de inicialización como ejecutable
RUN chmod +x /usr/src/app/entrypoint.sh

# Cambiar de nuevo al usuario mssql para ejecutar SQL Server
USER mssql

# Comando de inicio
CMD /bin/bash /usr/src/app/entrypoint.sh

