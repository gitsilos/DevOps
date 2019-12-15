# use an existing docker image as bse
FROM node:alpine

WORKDIR /usr/app
#download and install a dependency
COPY ./package.json ./
RUN npm install
COPY ./ ./

#tell the image what to do when it starts as container
CMD ["npm", "start"]
