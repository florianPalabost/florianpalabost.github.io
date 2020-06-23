const graphql = require('graphql');
const db = require('../db').db;
const { GraphQLObjectType, GraphQLString } = graphql;
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
        description: { type: GraphQLString },
        img: { type: GraphQLString },
        technos: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO projects(id, title, description, img, technos) VALUES ($1, $2, $3, $4, $5) RETURNING title`;
        const values = [args.id, args.title, args.description, args.img, args.technos];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },
    removeProject: {
      type: ProjectType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        const query = `DELETE FROM projects WHERE projects.id='${args.id}' RETURNING id`;
        return db
          .query(query)
          .then(res => res)
          .catch(err => err);
      }
    }
  }
});

exports.mutation = RootMutation;
