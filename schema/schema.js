const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql;

var books = [
  { name: "Cat in the hat", genre: "kids", id: "1" },
  { name: "Matrix", genre: "Action", id: "2" },
  { name: "As good as it gets", genre: "Comedy", id: "3" }
];

var authors = [
  { name: "Dnaiel Kapper", age: 29, id: "1" },
  { name: "Gulcan Yayle", age: 29, id: "2" },
  { name: "Allen Jones", age: 25, id: "3" }
];
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db /other source
        console.log(typeof args.id); // GraphQLID is also a string
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

// ? expamle query for graphiql
// book(id: "2") {
//   name
//   genre
// }

// author(id: 3) {
//   name
//   age
//   id
// }
