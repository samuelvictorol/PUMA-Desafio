const express = require('express');
const router = express.Router();
const usersController = require('./controllers/userController');

router.get('/users', usersController.getAllFavUsers);

module.exports = router;