// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Action = require("./actions-model")

router.get("/", (req, res) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

router.get("/:id", (req, res) => {
    Action.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})


router.post("/", (req, res) => {
    const newAction = req.body
    Action.insert(newAction)
        .then(() => {
            res.status(200).json(newAction)
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

router.put("/:id", (req, res) => {
    const changes = req.body
    Action.update(req.params.id, changes)
        .then(() => {
            res.status(200).json(changes)
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})

router.delete("/:id", (req, res) => {
    Action.remove(req.params.id)
        .then(() => {
            res.status(200).json("Deleted")
        })
        .catch(err => {
            res.status(500).json({ error: err})
        })
})


module.exports = router