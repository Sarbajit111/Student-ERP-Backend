const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema ({
    name: { type: String,require: true ,trim: true },
    email: { type: String,require: true ,unique: true ,trim: true },
    password: { type: String,require: true ,trim: true },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
});

module.exports = mongoose.model('students', studentsSchema);

