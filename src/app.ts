import dotenv from "dotenv";
dotenv.config(); //Has to be called before any other imports

import connect from "./database/db";
import express from "express";
import http from "http";
import { graphqlHTTP } from "express-graphql";
import { rootSchema } from "./schema";
import mongoApi from "./database/mongoApi"


const app = express();
app.use(express.json());
app.use('/graphql', graphqlHTTP({
    schema: rootSchema,
    context: mongoApi,
    graphiql: true,
}));

const port = 3000;
const server = http.createServer(app);

main();

async function main() {
    await connect();
    server.listen(port);
}