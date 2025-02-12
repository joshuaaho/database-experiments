FROM node

# Create app directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

COPY index.js /usr/src/app/index.js
RUN npm ci

EXPOSE 3000

CMD [ "npm", "run", "dev" ]