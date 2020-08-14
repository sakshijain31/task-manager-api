const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // refer to the User model
    }
},{
    timestamps: true
})

const Tasks = mongoose.model('Tasks', TaskSchema)

module.exports = Tasks