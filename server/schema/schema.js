// // //defining schema
// const graphql = require('graphql');
// const _ = require('lodash');
// const bean = require('../models/bean.js');
// const cafe = require('../models/cafe.js');
//
// // //defining object types using this. grabbing this variable graphQLObjectType from graphql. Destructuring.
// // //graphql is a package
// const {
//         GraphQLObjectType,
//         GraphQLString,
//         GraphQLSchema,
//         GraphQLID,
//         GraphQLInt,
//         GraphQLList
//       } = graphql;
//
//dummy data
// var beans = [
//   { name: 'Kibingo', region: 'Costa Rica', elevation: '6000', id: '1', cafeId:'1'},
//   { name: 'Ethiopia Guji', region: 'Sidam', elevation: '7000', id: '2', cafeId:'2'},
//   { name: 'La Avila', region: 'El Savador', elevation: '6300', id: '3', cafeId:'3'},
//   { name: 'Ocotepeque', region: 'Costa Rica', elevation: '6000', id: '1',cafeId:'1' },
//   { name: 'Blue Thunder', region: 'Blend', elevation: '7000', id: '3', cafeId:'3' },
//   { name: 'Nchengo', region: 'Kenya', elevation: '6300', id: '3', cafeId:'1' },
// ];
// var cafes = [
//   { name: 'Arcade', roast: 'light', id: '1'},
//   { name: 'Augies', roast: 'dark', id: '2'},
//   { name: 'Klatch', roast: 'medium', id: '3'}
// // ];
//
// // //defining new Type
// const CafeType = new GraphQLObjectType({
//   name:'Cafe',
//   fields:( )=>({
//       id:{type: GraphQLID},
//       name:{type: GraphQLString},
//       roast:{type: GraphQLString},
//       beans:{
//         type: new GraphQLList(BeanType),
//         resolve(parent, args){
//           // return _.filter(beans,{cafeId: parent.id})
//         }
//       }
//   })
// });
//
// const BeanType = new GraphQLObjectType({
//   name:'Bean',
//   fields:( )=>({
//       id:{type: GraphQLID},
//       name:{type: GraphQLString},
//       region:{type: GraphQLString},
//       elevation:{type: GraphQLInt},
//       cafe:{
//         type: CafeType,
//         resolve(parent, args){
//           console.log(parent);
//           // return _.find(cafes, { id: parent.cafeId})
//         }
//       }
//   })
// });
//
// // //defining how to get into the query-entrypoint.
// const RootQuery = new GraphQLObjectType({
//   name:'RootQueryType',
//   fields:{
//       cafe:{
//         type:CafeType,
//         args:{id:{type:GraphQLID}},
//         resolve(parent, args){
//         //code to get data from dbo/other source
//         // return _.find(cafes, {id: args.id});
//       }
//     },
//       bean:{
//         type:BeanType,
//         args:{id:{type: GraphQLID}},
//         resolve(parent, args){
//           // return _.find(beans, {id: args.id});
//         }
//       },
//       beans: {
//         type: new GraphQLList(BeanType),
//         resolve(parent, args){
//           return beans
//         }
//       },
//       cafes: {
//         type: new GraphQLList(CafeType),
//         resolve(parent,args){
//           return cafes
//         }
//       }
//     }
// });
//
// const Mutation = new GraphQLObjectType ({
//   name: 'Mutation',
//   fields:{
//     addCafe:{
//       type:CafeType,
//       args:{
//         name:{type:GraphQLString},
//         city:{type:GraphQLString}
//       },
//       resolve(parent, args){
//         let cafe = new Cafe({
//           name:args.name,
//           city:args.city
//         });
//         cafe.save();
//       }
//     }
//   }
// })
//
// module.exports = new GraphQLSchema({
//   query: RootQuery,
//   mutation: Mutation
// });

const graphql = require('graphql');
const Bean = require('../models/bean');
const Cafe = require('../models/cafe');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const BeanType = new GraphQLObjectType({
    name: 'Bean',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        region: { type: GraphQLString },
        cafe: {
            type: CafeType,
            resolve(parent, args){
                //return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const CafeType = new GraphQLObjectType({
    name: 'Cafe',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        city: { type: GraphQLString },
        beans: {
            type: new GraphQLList(BeanType),
            resolve(parent, args){
                //return _.filter(books, { cafeid: parent.id });
            }
        }
    })
});

//defining how to get into the query-entrypoint.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        bean: {
            type: BeanType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //return _.find(beans, { id: args.id });
            }
        },
        cafe: {
            type: CafeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //return _.find(cafes, { id: args.id });
            }
        },
        beans: {
            type: new GraphQLList(BeanType),
            resolve(parent, args){
                //return beans;
            }
        },
        cafes: {
            type: new GraphQLList(CafeType),
            resolve(parent, args){
                //return authors;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCafe: {
            type: CafeType,
            args: {
                name: { type: GraphQLString },
                city: { type: GraphQLString }
            },
            resolve(parent, args){
                let cafe = new Cafe({
                    name: args.name,
                    city: args.city
                });
                return cafe.save();
            }
        },
        addBean: {
            type: BeanType,
            args: {
              name: {type: GraphQLString,},
              region:{type: GraphQLString},
              elevation:{type: GraphQLString},
              cafeId:{type: GraphQLID}
          },
          resolve(parent, args){
            let bean = new Bean({
              name: args.name,
              region: args.region,
              id: args.id
            });
            return bean.save();
          }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
