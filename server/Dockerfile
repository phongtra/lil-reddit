FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn


COPY . .
COPY .env.production .env
RUN yarn build

EXPOSE 8080

ENV NODE_ENV production

CMD ["node", "dist/index.js"]

USER node