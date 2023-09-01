const express = require('express');
const router = express.Router();

const { assignTaskToUser } = require('../controllers/userTaskController');

router
    .post('/user/:userId/task/:taskId', assignTaskToUser)

module.exports = router;