const express = require('express');
const server = express();
const helmet = require("helmet")
const actionRouter = require("./actions/actions-router")
const projectRouter = require("./projects/projects-router")
// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use(helmet())
server.use("/api/actions", actionRouter)
server.use("/api/projects", projectRouter)



module.exports = server;
 