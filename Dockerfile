FROM node:18-alpine

WORKDIR /mweb

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN ["yarn", "run", "build"]

CMD ["yarn", "start"]