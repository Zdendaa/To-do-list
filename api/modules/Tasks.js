const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({   
        idOfList: {
            type: String,
        },
        what: {
            type: String,
        },
        category: {
            type: String,
        },
        reminder: {
            type: Boolean,
            default: false
        },
        type: {
            type: Boolean,
        }
},
{timestamps: true}
);

module.exports = mongoose.model("Tasks", TasksSchema);