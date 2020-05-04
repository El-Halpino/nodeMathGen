# How to run the Math Worksheet Generator (MWG)

1. How to run App locally - <br>
    1. Navigate to working directory ../nodeMathGen/mathGenApp <br>
    2. npm run start (use in terminal)

2. How to install Docker - <br>
    1. [Install Docker Here](https://docs.docker.com/get-docker/) <br>
    2. docker run hello-world (use in terminal)

3. Create a file named "Dockerfile" in the same directory as app.js (mathGenApp) -
    1. Insert the following into Dockerfile;
    2. FROM node:9-slim <br>
    WORKDIR /mathGenApp <br>
    COPY package.json /mathGenApp <br>
    COPY . /mathGenApp <br>
    CMD ["npm", "start"] <br>

4. How to run App in docker - <br>
    1. docker build -t math-app . (use in terminal) <br>
    2. docker run --rm -p 3000:3000 math-app (use in terminal)

5. How to start MonogDB with Docker - <br>
    1. mkdir ~/data (First Time) (use in terminal root)<br>
    2. sudo docker run -d -p 27017:27017 -v ~/data:/data/db mongo (use in terminal)
    