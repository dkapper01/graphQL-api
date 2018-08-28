const graphql = require("graphql");
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;


var books = [
  { name: "Cat in the hat", genre: "kids", id: '1' },
  { name: 'Matrix', genre: 'Action', id: '2' },
  { name: "As good as it gets", genre: 'Comedy', id: '3'}
]
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: { type: GraphQLString }},
      resolve(parent, args) {
        // code to get data from db /other source
        args.id
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
