# ETAP 1: Budowanie aplikacji 
FROM node:18-alpine as build

# Ustawia folder roboczy
WORKDIR /app

# Kopiuje pliki z zależnościami
COPY package.json package-lock.json ./

# Instaluje zależności
RUN npm install

# Kopiuje resztę kodu
COPY . .

# Buduje aplikację na produkcję
RUN npm run build

# ETAP 2: Serwowanie aplikacji 
FROM nginx:alpine

# Kopiuje zbudowane pliki z etapu 1 do serwera Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Kopiuje naszą konfigurację Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Otwiera port 80
EXPOSE 80

# Uruchamia Nginx
CMD ["nginx", "-g", "daemon off;"]