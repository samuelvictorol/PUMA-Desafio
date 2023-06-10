const express = require('express');
const router = express.Router();
const usersController = require('./controllers/userController');

router.get('/users', usersController.getAllUsers);

router.post('/users', usersController.addUser);

module.exports = router;