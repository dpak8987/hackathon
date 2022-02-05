# hackathon

> A Vue.js project

## Build Setup
Copy/clone the code from repo

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# run all tests
npm test
```

Docker :

#To Build Docker image
docker build -t <image-name> .
  
#To run docker container
docker run -it -p 8080:8080 -d --name <image-name>
  
#With using docker-compose.yml file, run the below command to build and run docker
docker-compose up -d --build
  
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
