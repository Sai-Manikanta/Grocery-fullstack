const UserTask = require('../models/userTask');
const User = require('../models/user');
const Task = require('../models/task');

const assignTaskToUser = async (req, res, next) => {
    try {
        if (req?.headers?.user?.role !== 'admin') {
            return res.status(400).json({
                status: 'failed',
                message: 'Admin only able to assign task to user',
                data: {}
            })
        }

        // If task already assigned to user
        const foundTaskWithUser = await UserTask.findOne({
            userId: req.params.userId,
            taskId: req.params.taskId,
        });

        if (foundTaskWithUser) {
            return res.status(400).json({
                status: 'failed',
                message: 'Task already assigned to user',
                data: {}
            })
        }

        // Check task exists or not
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'No user found',
                data: {}
            })
        }

        // Check task exists or not
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(400).json({
                status: 'failed',
                message: 'No task found',
                data: {}
            })
        }

        const assignTaskToUserData = {
            userId: req.params.userId,
            taskId: req.params.taskId,
            taskData: task
        }

        let assignedTaskToUser = new UserTask(assignTaskToUserData);

        assignedTaskToUser = await assignedTaskToUser.save();

        res.status(200).json({
            status: 'success',
            message: 'Task successfully assigned to user',
            data: assignedTaskToUser
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message,
            data: {}
        })
    }
}

module.exports = {
    assignTaskToUser
}