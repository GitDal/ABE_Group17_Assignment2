import express from "express";
import http from "http";
// import { graphqlHTTP } from "express-graphql";
// import { HotelScema } from "./hotelSchema";


const app = express();
app.use(express.json());
// app.use('/graphql', graphqlHTTP({
//     schema: HotelScema,
//     graphiql: true,
// }));


const port = 3000;
const server = http.createServer(app);

main();

async function main() {
    server.listen(port);
} 