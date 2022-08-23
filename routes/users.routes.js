const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users.controller');

router.get('/:login', UserController.getUserByLogin);

module.exports = router;