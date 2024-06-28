const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    role: {
        type: String,
    },
    roleDomain: { 
        type: String 
    },
    roleSummary: {
        type: String,
    },
    responsibilities: [{
        type: String,
    }],
    requirements: [{
        type: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('Roles', Schema);