const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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
    startDate: {
        type: Date,
        required: [true, 'Start date is required, please enter.'],
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required, please enter.'],
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;