const knex = require("knex");
const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);
//[process.env.NODE_ENV || 'development']
//This is what we would need if deploying to heroku

module.exports = db;
