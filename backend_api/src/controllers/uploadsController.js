const _ = require('underscore');

const createProject = async project => {
  return await db.addProject(project);
};

module.exports = {
  createProject
};
