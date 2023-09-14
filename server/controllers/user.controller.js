//user.controller.js
const bcrypt = require('bcryptjs');
const User = require('../models/user.model.js');
const yup = require('yup');

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  User.findById(req.userId)
    .select('-password')
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }
      res.status(200).json(user);
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

const changePasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters long')
});

exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    const { currentPassword, newPassword } = req.body;

    const currentPasswordMatch = bcrypt.compareSync(
      currentPassword,
      user.password
    );

    if (!currentPasswordMatch) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    try {
      await changePasswordSchema.validate({ newPassword });

      user.password = bcrypt.hashSync(newPassword, 8);
      await user.save();

      res.status(200).json({ message: 'Password changed successfully!' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Error changing password.' });
  }
};
