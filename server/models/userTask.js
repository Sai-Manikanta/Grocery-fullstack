const mongoose = require('mongoose');

const userTaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    taskData: {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        description: {
            type: String,
            required: [true, 'Description required'],
        },
        status: {
            type: String,
            enum: ['created', 'assigned', 'reopened', 'completed'],
            default: 'created'
        },
        compleation: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        comments: [{
            comment: {
                type: String,
            }
        }],
        startDate: {
            type: Date,
            required: [true, 'Start date is required, please enter.'],
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required, please enter.'],
        }
    }
});

const UserTask = mongoose.model('UserTask', userTaskSchema);

module.exports = UserTask;