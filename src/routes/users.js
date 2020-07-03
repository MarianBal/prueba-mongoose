const express = require('express');
const router = express.Router();
const {
  index,
  newUser,
  deleteUser,
  editUser,
  addSkill,
  deleteSkill,
  findById,
  findUser,
} = require('../controllers/user');

router
  .get('/', index)
  .post('/', newUser)
  .delete('/:userId', deleteUser)
  .put('/edit/:userId', editUser)
  .put('/:userId/skills', addSkill)
  .delete('/:userId/skills', deleteSkill)
  .get('/:userId', findById)
  .post('/find', findUser);

module.exports = router;
