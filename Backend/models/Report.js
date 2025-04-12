const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    issueType: String,
    description: String,
    user: String,
    lat: Number,
    lng: Number,
    mediaUrl: String,
    notify: Boolean,
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' },
    isDuplicate: { type: Boolean, default: false }
});

module.exports = mongoose.model('Report', reportSchema);
