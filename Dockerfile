# Stage 1: Build Angular App
FROM node:18.19.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm ci
RUN npm install -g @angular/cli

COPY . .

RUN ng --version  # Optional: Check Angular CLI version
RUN ng build --configuration=production

# Stage 2: Serve with NGINX
FROM nginx:latest

COPY --from=build /app/dist/angular-coursera /usr/share/nginx/html

EXPOSE 80
