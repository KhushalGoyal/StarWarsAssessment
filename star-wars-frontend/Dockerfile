
# Use Node 18 alpine as parent image
FROM node:18-alpine AS build

# Change the working directory on the Docker image to /app
WORKDIR /app


# Copy package.json and package-lock.json to the /app directory
COPY package.json package-lock.json ./

# Install, Testing and Building dependencies
RUN npm install

# Copy the rest of project files into this image
COPY . .

# Build angular project
RUN npm run build


# Serve Application using Nginx Server
FROM nginx:alpine

# Copy build file to nginx
COPY --from=build /app/dist/browser/ /usr/share/nginx/html

EXPOSE 80