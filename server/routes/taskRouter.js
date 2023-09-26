const express = require('express');
const router = express.Router();
const decodeToken = require('./../middlewares/decodeToken');

const { allTasks, singleTask, createTask, updateTask, assignTaskToUser } = require('../controllers/taskController');

router
    .route('/')
    .get(allTasks)
    .post(createTask)

router
    .route('/:id')
    .get(singleTask)
    .patch(decodeToken, updateTask)

// .patch('/', updateTask)

module.exports = router;