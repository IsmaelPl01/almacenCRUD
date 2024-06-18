# Etapa 1: Construir la aplicación
FROM node:16-alpine AS build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build /app/build /usr/share/nginx/html

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto
EXPOSE 80

# Comando por defecto para correr Nginx
CMD ["nginx", "-g", "daemon off;"]
