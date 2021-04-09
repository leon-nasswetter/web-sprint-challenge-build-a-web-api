// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Project = require("./projects-model")
const mw = require("./projects-middleware")

router.get("/", (req, res) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

router.get("/:id", mw.validateProjectId, (req, res) => {
    Project.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

router.post("/", mw.validateProjectBody, (req, res) => {
    const newProject = req.body
    Project.insert(newProject)
        .then(() => {
            res.status(200).json(newProject)
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

router.put("/:id", mw.validateProjectId, mw.validateProjectChange, (req, res) => {
    const changes = req.body
    Project.update(req.params.id, changes)
        .then(() => {
            res.status(200).json(changes)
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

router.delete("/:id", mw.validateProjectId, (req, res) => {
    Project.remove(req.params.id)
        .then(() => {
            res.status(200).json("deleted")
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

router.get("/:id/actions", mw.validateProjectId, (req, res) => {
    Project.getProjectActions(req.project.id) //set this in middleware later
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

module.exports = router