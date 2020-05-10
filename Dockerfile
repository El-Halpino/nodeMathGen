FROM node:9-slim
WORKDIR /project
COPY ./mathGenApp/. /project
CMD ["npm", "start"]