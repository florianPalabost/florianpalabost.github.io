const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const ProjectType = new GraphQLObjectType({
  name: "Project",
  type: "Query",
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    technos: { type: GraphQLString },
    img: { type: GraphQLString },
    url: { type: GraphQLString },
    anneeReal: { type: GraphQLString }
  }
});

exports.ProjectType = ProjectType;
