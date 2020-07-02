const User = require('../models/user');

module.exports = {
  index: async (req, res, next) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  newUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findOneAndRemove({ _id: req.params.userId }, { new: true });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  editUser: async (req, res) => {
    try {
      await UserfindOneAndUpdate(
        { _id: req.params.userId },
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          skills: req.body.skills,
        },
        {
          new: true,
        }
      );
      throw error('error');
      //res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
