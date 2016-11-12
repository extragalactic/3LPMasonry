import dotenv from 'dotenv'
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import Mongoose from 'mongoose';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import Schema from './lib/schema';
import Connectors from './lib/connectors';
import Resolvers from './lib/resolvers';
import config from '../webpack.dev';
import webpack from 'webpack';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotLoading from 'webpack-hot-middleware';
const app = express();
dotenv.config();

const compiler = webpack(config);

app.use(webpackMiddleWare(compiler,{
  publicPath: '/dist/',
  hot: true
}));

app.use(webpackHotLoading(compiler))

const cred = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
};

Mongoose.Promise = global.Promise;
Mongoose.connect(process.env.DB_HOST, cred);
Mongoose.connection.on('connected', () => {
  console.log('mlab is connected!');
});

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});



app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
  context: {
    constructor: Connectors,
  },
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.set('port', (process.env.PORT || 8080));
app.use(express.static(path.join(__dirname, '../browser/')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../browser/index.html'));
});

app.listen(app.get('port'));
