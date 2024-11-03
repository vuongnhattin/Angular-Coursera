# Stage 1: Build Angular App
FROM node:18.19.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm ci
RUN npm install -g @angular/cli

COPY . .

RUN npm install
RUN ng build

# Stage 2: Serve with NGINX
FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/angular-coursera/browser /usr/share/nginx/html

EXPOSE 80
