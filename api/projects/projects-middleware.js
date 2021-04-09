const Projects = require("../projects/projects-model");

async function validateProjectId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json("Project with given ID not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function validateProjectBody(req, res, next) {
  const { name, description } = req.body;
  description && name
    ? next()
    : res.status(400).json({ error: "Fill out missing fields" });
}

function validateProjectChange(req, res, next) {
  const { name, description, completed } = req.body;
  description || name || completed
    ? next()
    : res.status(400).json({ error: "Fill out missing fields" });
}

module.exports = {
  validateProjectId,
  validateProjectBody,
  validateProjectChange,
};