# Dockerfile
FROM node:11.13.0-alpine

# create working directory
WORKDIR /hackapp

# Add current directory code to working directory
COPY package*.json ./
COPY .postcssrc.js ./
COPY index.html ./

RUN npm install

EXPOSE 8080

# CMD [ "npm", "run", "dev" ]


