const graphql = require("graphql");
const axios = require("axios");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

//pascal case
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        try {
          const { data } = await axios.get(
            `http://localhost:3000/users/${args.id}`
          );
          return data;
        } catch (error) {
          console.log(`error: `, error.response.statusText);
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
