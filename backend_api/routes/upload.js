const express = require('express');
const router = express.Router();
const multer = require('multer');

const { gql } = require('apollo-server');
const TypeDef = gql`
  type Mutation {
    upload(file: Upload!)
  }
`;

router.post(
  '/',
  upload.single('uploadedImage'),
  (req, res, next) => {
    const file = req.file;
    console.log('call back');
    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }
    res.status(200).send({
      statusCode: 200,
      status: 'success',
      uploadedFile: file
    });
  },
  (error, req, res, next) => {
    res.status(400).send({
      error: error.message
    });
  }
);

module.exports = router;
