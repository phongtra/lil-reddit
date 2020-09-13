import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__, COOKIE_NAME } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mikroConfig from './mikro-orm.config';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/Hello';
import { PostResolver } from './resolvers/Post';
import { UserResolver } from './resolvers/User';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true
      }),
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, //1 year
        httpOnly: true,
        sameSite: 'lax', //csrf
        secure: __prod__ //cookie only works in https
      },
      secret: 'sadjkhsajhdksahdkasjhdakdhak',
      resave: false
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res })
  });
  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(4000, () => {
    console.log('Listening on port 4000');
  });
};

main();
