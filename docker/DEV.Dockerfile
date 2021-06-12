FROM node:alpine
CMD npm dev
WORKDIR /app
COPY package*.json ./
RUN npm install
# npm config set scripts-prepend-node-path true &&
# COPY . .