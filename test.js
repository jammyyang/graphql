//defining schema
const graphql = require('graphql');
const _ = require('lodash');

//defining object types using this. grabbing this variable graphQLObjectType from graphql. Destructuring.
//graphql is a package
const {GraphQLObjectType, GraphQlString, GraphQLSchema} = graphql;

//dummy data
var cafes = [
  { name: 'Lift', roast: 'light', id: '1' },
  { name: 'Augies', roast: 'dark', id: '2' },
  { name: 'Klatch', roast: 'medium', id: '3' },
];

//defining new Type
const CafeType = new GraphQLObjectType({
  name:'Cafe',
  fields:( )=>({
      id:{type: GraphQlString},
      name:{type: GraphQlString},
      roast:{type: GraphQlString}
  })
});

//defining how to get into the query-entrypoint.
const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
      cafe:{
        type:CafeType,
        args:{id:{type:GraphQlString}},
        resolve(parent, args){
        //code to get data from dbo/other source
        return _.find(cafes, {id: args.id});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
