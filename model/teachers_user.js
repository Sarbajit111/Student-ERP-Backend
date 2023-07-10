const mongoose = require('mongoose');

const teachersSchema = new mongoose.Schema ({
    name: String,
    email: String,
    password: String
});