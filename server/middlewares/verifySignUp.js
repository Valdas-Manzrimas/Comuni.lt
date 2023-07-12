const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateEmail = (req, res, next) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send({ message: 'Email is required!' });
  }

  User.findOne({ email })
    .exec()
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .send({ message: 'Failed! Email is already in use!' });
      }

      next();
    })
    .catch((err) => {
      console.error('Error checking duplicate email:', err);
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
  checkDuplicateEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
