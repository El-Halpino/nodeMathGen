FROM node:9-slim
RUN apt-get update
RUN apt-get upgrade -y
RUN apt install git -y
WORKDIR /project
COPY ./mathGenApp/. /project
RUN npm install
CMD ["npm", "start"]