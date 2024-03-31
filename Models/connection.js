const mongoose = require('mongoose')
//connection to database
require('dotenv').config()
const uri = process.env.MONGO_DB_URI

async function connectDatabase() {
    try {
        mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        throw error;
    }
}

const connection = mongoose.connection
module.exports = {
    connection,
    connectDatabase
}