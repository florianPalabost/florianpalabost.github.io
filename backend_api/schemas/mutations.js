const graphql = require('graphql');
const db = require('../db').db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;
const { ProjectType } = require('./types');

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  type: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO projects(id, title, description) VALUES ($1, $2, $3) RETURNING title`;
        const values = [args.id, args.title, args.description];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    }
  }
});

exports.mutation = RootMutation;
