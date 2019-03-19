import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as productsRouter from "./products-rest-endpoint";

const main = express();
const mainRoute = '/api/v1';

main.use(mainRoute + '/products', productsRouter);

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

exports.restApi = functions.https.onRequest(main);
