const router = require("express").Router();
const authModel = require("./users-module.js");
const restrict = require("../auth/restrict");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../secrets/secrets.js");
const sessions = require("express-session");
const KnexSessionStore = require("connect-session-knex")(sessions);
// router.get("/users", (req, res) => {});
router.get("/users", (req, res) => {
  authModel
    .find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Check users-router get section", ...err })
    );
});
router.get("/users/:id", (req, res) => {
  const { id } = req.params;

  authModel
    .getById(id)
    .then(users => {
      if (!users[0]) {
        res.status(404).json({ message: "Invalid users ID" });
      } else {
        res.status(200).json(users);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error fetching users from database" });
    });
});
// router.get("/users/:id", (req, res) => {
//   authModel
//     .findById()
//     .then(users => {
//       res.status(201).json(users);
//     })
//     .catch(err =>
//       res
//         .status(500)
//         .json({ message: "Check users-router get section", ...err })
//     );
// });

// router.post("/login", authUser, (req, res) => {});

router.post("/register", (req, res) => {
  const u = req.body;
  if (u.username && u.password) {
    authModel
      .addUser(u)
      .then(p => {
        res.status(201).json(p);
      })
      .catch(err => {
        res.status(400).json({ message: "check server File", ...err });
      });
  } else {
    res.status(500).json({ message: "need username and password" });
  }
});

// function genToken(user) {
//   const
// }

// router.post("/login", (req, res) => {
//   let { username, password } = req.body;

//   authModel
//     .findByUserName({ username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         const token = genToken(user);
//         res.status(200).json({
//           message: `Welcome ${user.username}!`,
//           token
//         });
//       } else {
//         res.status(401).json({ message: "Invalid Credentials" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  authModel
    .findBy({ username })
    .first()
    .then(users => {
      if (users && bcryptjs.compareSync(password, users.password)) {
        const token = genToken(users);
        res.status(200).json({ message: `Welcome ${users.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      res.status(200).json("you have been knock out");
    });
  } else {
    res.status(400).json("your already logged out! your drunk go home!");
  }
});
function genToken(user) {
  const payload = {
    username: user.username,
    subject: user.id,
    department: user.department
  };
  const secret = "its a secret! dont tell anyone";
  const options = {
    expiresIn: "2h"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
