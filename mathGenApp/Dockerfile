FROM node:9-slim
WORKDIR /mathGenApp
COPY package.json /mathGenApp
RUN npm install
COPY . /mathGenApp
CMD ["npm", "start"]
