FROM node:9-slim
WORKDIR /mathGenApp
COPY package.json /mathGenApp
COPY . /nodeMathGen
CMD ["npm", "start"]