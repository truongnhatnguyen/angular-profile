const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProjectSchema = new Schema({
    name: String,
    startDate: { type: Date, default: Date.now },
    endDate: Date,
    teamSize: { type: Number, default: 0 },
    budget: { type: Number, default: 0 },
    expense: { type: Number, default: 0 },
    status: { type: String, default: 'working' }
});
module.exports = mongoose.model('project', ProjectSchema);