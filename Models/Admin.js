const mongoose = require('mongoose');

// Define the message schema
const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        requried:true
    }
});

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;
