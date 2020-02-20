const db = require("../data/dbConfig");

const bcrypt = require("bcryptjs");

module.exports = {
  find,
  findBy,
  getById,
  addUser,
  findByUserName,
  findUserByID
};

function find() {
  return db("users").select("id", "username", "department", "password");
}

function addUser(user) {
  const { username, password } = user;

  if (username && password) {
    const hash = bcrypt.hashSync(password, 8);
    user.password = hash;

    return db("users")
      .insert(user, "id")
      .then(id => findUserByID(id));
  }
}

function findUserByID([id]) {
  return db("users")
    .where({ id })
    .first();
}

function findByUserName(username) {
  return db("users")
    .where({ username })
    .first();
}

function findBy(filter) {
  return db("users").where(filter);
}

function getById(id) {
  return db("users").where({ id });
}
