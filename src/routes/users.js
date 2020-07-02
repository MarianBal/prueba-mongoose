const express = require('express');
const router = express.Router();
const { index, newUser, deleteUser, editUser } = require('../controllers/user');

router
  .get('/', index)
  .post('/', newUser)
  .delete('/:userId', deleteUser)
  .put('/edit/:userId', editUser);

module.exports = router;
