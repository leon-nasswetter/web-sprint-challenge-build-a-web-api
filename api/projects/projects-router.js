// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Project = require("./projects-model")

router.get("/", (req, res) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

router.get("/:id", (req, res) => {
    Project.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

router.post("/", (req, res) => {
    const newProject = req.body
    Project.insert(newProject)
        .then(() => {
            res.status(200).json(newProject)
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

router.put("/:id", (req, res) => {
    const changes = req.body
    Project.update(req.params.id, changes)
        .then(() => {
            res.status(200).json(changes)
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

router.delete("/:id", (req, res) => {
    Project.remove(req.params.id)
        .then(() => {
            res.status(200).json("deleted")
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

router.get("/:id/actions", (req, res) => {
    Project.getProjectActions(req.project.id) //set this in middleware later
        .this(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

module.exports = router