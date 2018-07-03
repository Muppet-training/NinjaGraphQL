const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Allow cross origin requests
app.use(cors());

// Connect to mlab database
mongoose.connect(
	'mongodb://test123:test123@ds117691.mlab.com:17691/ninjagraphql'
);
mongoose.connection.once('open', () => {
	console.log('Connected to database..');
});

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true
	})
);

app.listen(4000, () => {
	console.log('Now Listening to requests on port 4000...');
});
