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
};
