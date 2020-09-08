import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mikroConfig from './mikro-orm.config';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/Hello';
import { PostResolver } from './resolvers/Post';
import { UserResolver } from './resolvers/User';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false
    }),
    context: () => ({ em: orm.em })
  });
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log('Listening on port 4000');
  });
};

main();
