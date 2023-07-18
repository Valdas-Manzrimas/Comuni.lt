//user.controller.js
const User = require('../models/user.model.js');

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  User.findById(req.userId)
    .select('-password') // Exclude the password from the response
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }
      res.status(200).json(user); // Send the user data as JSON
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
      res.status(500).send({ message: 'Error fetching user data.' });
    });
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};
