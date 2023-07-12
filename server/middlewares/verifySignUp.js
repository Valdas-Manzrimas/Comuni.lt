const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;

  User.findOne({ username })
    .exec()
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .send({ message: 'Failed! Username is already in use!' });
      }

      return User.findOne({ email }).exec();
    })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .send({ message: 'Failed! Email is already in use!' });
      }

      next();
    })
    .catch((err) => {
      console.error('Error checking duplicate username or email:', err);
      res.status(500).send({ message: 'Internal server error.' });
    });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
