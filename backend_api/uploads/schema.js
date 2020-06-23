const { buildSchema } = require('graphql');

const schema = buildSchema(`
    scalar Upload
type File {
        name: String
        type: String
        size: Int
    }

type Mutation {
        uploadImage(file: Upload!): File
    }

type Query {
        getPhotos: String,
    }
`);
module.exports.schema = schema;
