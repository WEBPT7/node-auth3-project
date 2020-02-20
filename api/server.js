const express = require("express");
const helmet = require("helmet");
// const cors = require("cors");
// const sessions = require("express-session");
// const KnexSessionStore = require("connect-session-knex")(sessions);
const UsersRouter = require("../projects/users-router");
// const ResourceRouter = require("../resources/resource-router.js");
// const TaskRouter = require("../tasks/tasks-router.js");

const server = express();
// const sessionConfiguration = {
//   name: "ohfosho",
//   secret: "keep it secret, keep it safe",
//   cookie: {
//     httpOnly: true,
//     maxAge: 1000 * 60 * 60,
//     secure: false //prosess.env.NODE_ENV
//   },
//   resave: false,
//   saveUninitialized: true, // should be false on live site so the client has to agree for cookies
//   store: new KnexSessionStore({
//     knex: knexConfig,
//     createtable: true,
//     clearInterval: 1000 * 60 * 30
//   })
// };

//initial GET
server.get("/", (req, res) => {
  res.json({ message: "server is up and running" });
});

// server.use(sessions(sessionConfiguration));
server.use(helmet());
server.use(express.json());
// server.use(cors());

server.use("/api", UsersRouter);
// server.use("/api/resources", ResourceRouter);
// server.use("/api/task", TaskRouter);

module.exports = server;
