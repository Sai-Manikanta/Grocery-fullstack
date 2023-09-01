const Task = require('./../models/task');

const createTask = async (req, res, next) => {
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

const updateTask = async (req, res, next) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req?.body?._id, req?.body, { new: true });

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
    updateTask
}