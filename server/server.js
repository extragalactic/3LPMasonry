import dotenv from 'dotenv';
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

import CustomersModel from './lib/CustomerModel';

const app = express();
dotenv.config();

if (process.env.PROD === 'false') {
  console.log('dev');
  const compiler = webpack(config);
  app.use(webpackMiddleWare(compiler, {
    publicPath: '/dist/',
    hot: true,
    host: '174.6.231.143',
  }));
  app.use(webpackHotLoading(compiler));
}

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

app.post('/updatenotes', bodyParser.json(), (req, res) => {
  CustomersModel.findOneAndUpdate({ _id: req.body.customer }, { notes: req.body.rawdata })
        .then((data) => {
          res.send(data);
        });
});

app.get('/getnotes/:id', (req, res) => {
  CustomersModel.findOne({ _id: req.params.id })
       .then((customer) => {
         res.send(customer.notes);
       });
});

app.get('/getcustomer/:id', (req, res) => {
  CustomersModel.findOne({ _id: req.params.id })
          .then((data) => {
            res.send(data);
          });
});

app.post('/saveimage', bodyParser.json(), (req, res) => {
  CustomersModel.findOne({ _id: req.body.id })
        .then((data) => {
          data.customerUpload.push(req.body.payload);
          data.save();
          res.send(data);
        });
});

app.set('port', (process.env.PORT || 8080));
app.use(express.static(path.join(__dirname, '../browser/')));
app.use(express.static(path.join(__dirname, './ssr/pesdk/')));

app.use(express.static(path.join(__dirname, './ssr/')));
app.get('/upload/:id', (req, res) => {
  res.sendFile(path.join(__dirname, './ssr/uploadcare.html'));
});
app.use(express.static(path.join(__dirname, '../customerfacing/')));
app.get('/email', (req, res) => {
  res.sendFile(path.join(__dirname, '../customerfacing/index.html'));
});

app.get('/estimate', (req, res) => {
  res.sendFile(path.join(__dirname, './ssr/pesdk/survey.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../browser/index.html'));
});

app.listen(app.get('port'));
