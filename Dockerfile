FROM node:9-slim
WORKDIR /nodeMathGen
COPY package.json /nodeMathGen/mathGenApp
COPY . /nodeMathGen
CMD ["npm", "start"]
