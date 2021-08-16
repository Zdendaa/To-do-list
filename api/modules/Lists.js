const mongoose = require('mongoose');

const ListsSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    } 
},
{timestamps: true}
);

module.exports = mongoose.model("Lists", ListsSchema);