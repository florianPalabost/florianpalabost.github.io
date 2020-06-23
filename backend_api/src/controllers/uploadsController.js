const _ = require('underscore');
const uploadService = require('../services/uploadService');

const upload = async files => {
  return await uploadService.upload(files);
};

module.exports = {
  upload
};
