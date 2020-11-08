// Employee.js
const mongoose = require('mongoose');

const employee = new mongoose.Schema({
    title: String,
    name: String,
    wage: Number,
    company: {type: mongoose.ObjectId, ref: 'Company'}
});

module.exports = mongoose.model('Employee', employee);