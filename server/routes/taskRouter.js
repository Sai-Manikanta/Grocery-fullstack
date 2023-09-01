const express = require('express');
const router = express.Router();

const { createTask, updateTask, assignTaskToUser } = require('../controllers/taskController');

router
    .post('/', createTask)
    .patch('/', updateTask)

module.exports = router;