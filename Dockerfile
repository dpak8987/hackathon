# Dockerfile
FROM node:11.13.0-alpine

# create destination directory
RUN mkdir /hackapp
WORKDIR /hackapp

# Add current directory code to working directory
ADD . /hackapp/

RUN npm install

EXPOSE 8080

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8080


