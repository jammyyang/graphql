// const express = require('express');
// const graphqlHTTP = require('express-graphql');
// const schema = require('./schema/schema');
//
// const app = express();
//
// //like using middleware with one single route
// app.use('/graphql', graphqlHTTP({
//   //pass in some options
//   //old way --> schema:schema
//   //es6
//   schema,
//   graphiql:true
// }));
//
// //listening for the app on port 4000. (port, call back function using arrow f)
// //using nodemon to listen for changes and server starts itself if a change.
// //this didn't work on my iwa cpu.
// //install graphql and express-graphql
// app.listen(4000, ()=>{
//   console.log('now listening for requests on port 4000');
// });


const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

//connect to mlab database
//make sure to replace my db string and creds with my own
mongoose.connect('mongodb://jammy:test@ds251435.mlab.com:51435/gql-cafes');
mongoose.connection.once('open', ()=>{
  console.log('connected to database');
});
// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
