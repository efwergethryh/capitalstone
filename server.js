// Importing the required modules
const http = require('http');
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { connectDatabase } = require('./Models/connection')
connectDatabase();
const viewsRoutes = require('./Routes/viewsRoutes');
// const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use(viewsRoutes)

const port = 5000;
const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});