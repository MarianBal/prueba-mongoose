const User = require('../models/user');
const { findOne, find } = require('../models/user');

module.exports = {
  index: async (req, res) => {
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
    const { body } = req;

    try {
      const foundUser = await User.findById(req.params.userId);

      const update = {};
      for (let field in body) {
        if (body[field] !== foundUser[field]) update[field] = body[field];
      }
      const prueba = await User.updateOne({ _id: req.params.userId }, update, {
        new: true,
      });

      res.status(200).json(prueba);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  addSkill: async (req, res) => {
    try {
      const skilledUser = await User.updateOne(
        { _id: req.params.userId },
        { $addToSet: { skills: { $each: req.body.skills } } },
        { new: true }
      );
      res.status(200).json(skilledUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteSkill: async (req, res) => {
    try {
      const noSkilledUser = await User.updateOne(
        { _id: req.params.userId },
        { $pullAll: { skills: req.body.skills } },
        { new: true }
      );
      res.status(200).json(noSkilledUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  findById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  findUser: async (req, res) => {
    try {
      const user = await User.find(req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
