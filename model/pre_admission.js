const mongoose = require('mongoose');

const preAdmission = new mongoose.Schema ({
    name: { type: String, require: true ,trim: true },
    email: { type: String, unique: true ,require: true ,trim: true },
    contactNumber: { type: String,unique: true, require: true ,trim: true },
    studentId: { type: String,unique: true, require: true ,trim: true },
    source: { type: String, require: true ,trim: true },
    status: { type: String, require: true ,trim: true, default: 'active' },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
});

module.exports = mongoose.model('pre-admission', preAdmission);