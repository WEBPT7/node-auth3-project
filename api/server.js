const express = require("express");
const helmet = require("helmet");

const ProjectRouter = require("./projects/project-router.js");
const ResourceRouter = require("./resources/resource-router.js");
const TaskRouter = require("../tasks/tasks-router.js");

const server = express();

//initial GET
server.get("/", (req, res) => {
  res.json({ message: "server is up and running" });
});

server.use(helmet());
server.use(express.json());

server.use("/api/projects", ProjectRouter);
server.use("/api/resources", ResourceRouter);
server.use("/api/task", TaskRouter);

module.exports = server;
