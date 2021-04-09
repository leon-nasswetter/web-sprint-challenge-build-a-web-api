const express = require('express');
const server = express();
const helmet = require("helmet")
const actionRouter = require("./actions/actions-router")
// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use(helmet())
server.use("/api/actions", actionRouter)



module.exports = server;
 