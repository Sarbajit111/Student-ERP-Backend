const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema ({
    name: { type: String,require: true ,trim: true },
    email: { type: String,require: true ,trim: true },
    password: { type: String,require: true ,trim: true },
    user_role: { type: String,require: true ,trim: true },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
});

module.exports = mongoose.model('admins', adminSchema);