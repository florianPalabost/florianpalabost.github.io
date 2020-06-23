const express = require('express');
const router = express.Router();

router.post('/update-rewatch', (req, res) => {
  ProjectsController.createProject(req, res);
});

module.exports = router;
