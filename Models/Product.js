const mongoose = require('mongoose');

// Define the message schema
const productSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    path:{
        type:String,
        requried:true
    }
});

// Create a Mongoose model from the schema
const Product = mongoose.model('products', productSchema);
module.exports = Product;
