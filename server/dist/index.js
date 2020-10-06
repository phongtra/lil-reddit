"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv-safe/config");
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const Hello_1 = require("./resolvers/Hello");
const Post_1 = require("./resolvers/Post");
const User_1 = require("./resolvers/User");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const Post_2 = require("./entities/Post");
const User_2 = require("./entities/User");
const path_1 = __importDefault(require("path"));
const Updoot_1 = require("./entities/Updoot");
const createUserLoader_1 = require("./utils/createUserLoader");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        logging: true,
        migrations: [path_1.default.join(__dirname, './migrations/*')],
        entities: [Post_2.Post, User_2.User, Updoot_1.Updoot]
    });
    yield conn.runMigrations();
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    app.set('proxy', 1);
    app.use(cors_1.default({ origin: process.env.CORS_ORIGIN, credentials: true }));
    app.use(express_session_1.default({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true
        }),
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1.__prod__,
            domain: constants_1.__prod__ ? '.codeponder.com' : undefined
        },
        secret: process.env.SESSION_SECRET,
        resave: false
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [Hello_1.HelloResolver, Post_1.PostResolver, User_1.UserResolver],
            validate: false
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
            userLoader: createUserLoader_1.createUserLoader()
        })
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(parseInt(process.env.PORT), () => {
        console.log('Listening on port ' + process.env.PORT);
    });
});
main();
//# sourceMappingURL=index.js.map