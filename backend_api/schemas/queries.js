const { db } = require('../db');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const { ProjectType } = require('./types');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  type: 'Query',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parentValue) {
        const query = `SELECT * FROM projects`;

        return db
          .query(query)
          .then(res => res)
          .catch(err => console.log(err));
      }
    }
  }
});

exports.query = RootQuery;
