const Task = require('./../models/task');

const allTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        res.status(200).json({
            status: 'success',
            message: 'All tasks successfully fetched',
            data: {
                tasks
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message,
            data: {}
        })
    }
}

const singleTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'All tasks successfully fetched',
            data: {
                task
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message,
            data: {}
        })
    }
}

const createTask = async (req, res) => {
    try {
        if (req?.headers?.user?.role !== 'admin') {
            return res.status(400).json({
                status: 'failed',
                message: 'Admin only able to create task',
                data: {}
            })
        }

        let task = new Task({
            ...req.body
        });

        task = await task.save();

        res.status(200).json({
            status: 'success',
            message: 'Task succefully created',
            data: task
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message,
            data: {}
        })
    }
}

const updateTask = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(401).json({
                status: 'failed',
                message: 'You are not a authorized person to do this action',
                data: {}
            })
        }
        // console.log(req.user.role);

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            status: 'success',
            message: 'Task updated successfully',
            data: updatedTask
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
    createTask,
    updateTask,
    allTasks,
    singleTask
}