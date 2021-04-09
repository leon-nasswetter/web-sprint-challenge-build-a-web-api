const Actions = require("../actions/actions-model");

function logger(req, res, next) {
  console.log(`Method: ${req.method} | URL: ${req.originalUrl}`);
  next();
}

async function validateActionId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id);
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).json("Action with given ID not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function validateActionBody(req, res, next) {
  const { project_id, description, notes } = req.body;
  project_id && description && notes
    ? next()
    : res.status(400).json({ error: "Fill out missing fields" });
}

function validateActionChange(req, res, next) {
  const { completed, project_id, description, notes } = req.body;
  project_id || description || notes || completed
    ? next()
    : res.status(400).json({ error: "Fill out missing fields" });
}

module.exports = {
  logger,
  validateActionId,
  validateActionBody,
  validateActionChange,
};