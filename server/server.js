import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import timeout from 'connect-timeout';
import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import Mongoose from 'mongoose';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import webpack from 'webpack';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotLoading from 'webpack-hot-middleware';

import Schema from './lib/schema';
import Connectors from './lib/connectors';
import Resolvers from './lib/resolvers';
import config from '../webpack.dev';
import CustomersModel from './lib/CustomerModel';

Mongoose.Promise = global.Promise;

const ssl = {
  key: fs.readFileSync(path.join(__dirname, '../certs/private.key'), 'utf8'),
  cert: fs.readFileSync(path.join(__dirname, '../certs/cert.crt'), 'utf8'),
  ca: [fs.readFileSync(path.join(__dirname, '../certs/chain_a.crt'), 'utf8'),
    fs.readFileSync(path.join(__dirname, '../certs/chain_b.crt'), 'utf8'),
    fs.readFileSync(path.join(__dirname, '../certs/chain_c.crt'), 'utf8')],
};

const app = express();
dotenv.config();
console.log(process.env);

if (process.env.PROD === 'false') {
  console.log('hotload');
  console.log('dev');
  const compiler = webpack(config);
  app.use(webpackMiddleWare(compiler, {
    publicPath: '/dist/',
    hot: true,
    host: '174.6.231.143',
  }));
  app.use(webpackHotLoading(compiler));
}

Mongoose.Promise = global.Promise;

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});

const jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
const urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding' });
app.use(jsonParser);
app.use(urlencodedParser);

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
app.get('/onlinestatus', (req, res) => res.status(200).send('status'));

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
app.use(express.static(path.join(__dirname, '../customerupload/build/static')));
app.use(express.static(path.join(__dirname, '../customerupload/build/static/css')));
app.use(express.static(path.join(__dirname, '../customerupload/build/static/media')));
app.use(express.static(path.join(__dirname, '../customerupload/build')));
app.get('/upload/:userid', (req, res) => {
  res.sendFile(path.join(__dirname, '../customerupload/build/index.html'));
});

const imageOptions = {
  index: false,
};
app.use('/images', express.static(path.join(__dirname, '../images'), imageOptions));
app.get('/images/:filename', (req, res) => {
  res.sendFile(path.join(__dirname, `../images/${req.params.filename}`));
});

app.use('/documents', express.static(path.join(__dirname, '../documents'), imageOptions));
app.get('/images/:filename', (req, res) => {
  res.sendFile(path.join(__dirname, `../documents/${req.params.filename}`));
});

app.get('/email', (req, res) => {
  res.sendFile(path.join(__dirname, '../customerfacing/index.html'));
});

app.get('/estimate', (req, res) => {
  res.sendFile(path.join(__dirname, './ssr/pesdk/survey.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../browser/index.html'));
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(timeout('10s'));

const options = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 800000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 800000 } } };

Mongoose.connect(process.env.DB_HOST, options);
const conn = Mongoose.connection;             
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => {
  app.listen(app.get('port'));
  //https.createServer(ssl, app).listen(443);
});
