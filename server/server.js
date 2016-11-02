import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import Schema from './lib/schema';
import Connectors from './lib/connectors';
import Resolvers from './lib/resolvers';



const app = express();


const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  connectors: Connectors,
});




app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: executableSchema }));

app.set('port', (process.env.PORT || 8080));
app.use(express.static(path.join(__dirname, '../browser')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../browser/index.html'));
});

app.listen(app.get('port'));
