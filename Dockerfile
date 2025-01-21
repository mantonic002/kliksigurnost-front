# Build faza
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginx faza
FROM nginx:alpine

# Kopiraj statičke fajlove iz build faze
COPY --from=build /app/dist /usr/share/nginx/html

# Kopiraj nginx konfiguraciju
COPY nginx.conf /etc/nginx/nginx.conf

# Otvori port 80
EXPOSE 80

# Pokreni Nginx
CMD ["nginx", "-g", "daemon off;"]