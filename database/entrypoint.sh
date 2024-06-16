#!/bin/bash

# Iniciar SQL Server en segundo plano
/opt/mssql/bin/sqlservr &

# Esperar a que SQL Server inicie (puede ajustar el tiempo de espera según sea necesario)
sleep 30s

# Verificar si la base de datos 'almacen' ya existe
if /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P $MSSQL_SA_PASSWORD -Q "IF DB_ID('almacen') IS NOT NULL PRINT 'DB EXISTS'" | grep -q "DB EXISTS"
then
    echo "La base de datos 'almacen' ya existe. No se realizarán cambios."
else
    echo "La base de datos 'almacen' no existe. Creando la base de datos y el esquema..."
    # Ejecutar el script SQL para inicializar la base de datos
    /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P $MSSQL_SA_PASSWORD -i /usr/src/app/init.sql
fi

# Verificar si el usuario admin ya existe
if /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P $MSSQL_SA_PASSWORD -d almacen -Q "SELECT 1 FROM Users WHERE Username = '$ADMIN_USERNAME'" | grep -q "1"
then
    echo "El usuario admin ya existe. No se realizarán cambios."
else
    echo "El usuario admin no existe. Creando el usuario admin por defecto..."
    # Insertar el usuario admin por defecto
    /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P $MSSQL_SA_PASSWORD -d almacen -Q "INSERT INTO Users (Username, PasswordHash, Email, Role) VALUES ('$ADMIN_USERNAME', '$ADMIN_PASSWORD_HASH', '$ADMIN_EMAIL', 'admin')"
fi

# Mantener el contenedor en ejecución
wait

