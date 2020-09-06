import { __prod__ } from './constants';
import { Post } from './entities/Post';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';

export default {
  migrations: {
    path: path.join(__dirname, 'migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/ // regex pattern for the migration files
  },
  dbName: 'lil-reddit',
  user: 'postgres',
  password: '2606',
  debug: !__prod__,
  type: 'postgresql',
  entities: [Post]
} as Parameters<typeof MikroORM.init>[0];
