const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateEmail = (req, res, next) => {
<<<<<<< HEAD
  const { email, firstName, lastName, password } = req.body;
=======
  const {email, firstName, lastName, password } = req.body;
>>>>>>> 1c549753c5991c9383cb9bcac76e1143929bc992

  if (!email) {
    return res.status(400).send({ message: 'Email is required!' });
  }
  if (!firstName || !lastName) {
    return res.status(400).send({ message: 'Full name is required!' });
  }
  if (!password) {
    return res.status(400).send({ message: 'Password is required' });
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
