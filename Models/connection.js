const mongoose = require('mongoose')
//connection to database

const uri = 'mongodb+srv://MostafaSalam:MostafaSalam123456@cluster0.pdm8tap.mongodb.net/capitalStone'

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