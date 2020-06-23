const { db } = require('../db');
const { GraphQLObjectType, GraphQLID } = require('graphql');
const { ProjectType } = require('./types');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  type: 'Query',
  fields: {
    project: {
      type: ProjectType,
      resolve(parentValue) {
        const query = `SELECT * FROM projects`;

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    }
  }
});

exports.query = RootQuery;
