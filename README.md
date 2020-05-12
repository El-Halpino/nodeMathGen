# How to run the Math Worksheet Generator (MWG)

1. How to install Docker - <br>
    1. [Install Docker Here](https://docs.docker.com/get-docker/) <br>

2. How to start MonogDB with Docker - <br>
    1. Navigate to root of terminal.<br>
     $ mkdir ~/data<br>
     $ sudo docker run -d -p 27017:27017 -v ~/data:/data/db mongo 
    
3. How to run App locally - <br>
    1. Navigate to working directory ../nodeMathGen/mathGenApp <br>
    $ npm run start

4. How to run App in docker - <br>
    1. Navigate to directory containing the DockerFile.<br>
     $ docker build -t math-app . <br> 
     $ docker run -d -p 3000:3000 --network host math-app

5. Navigate to http://localhost:3000/
    1. Signup