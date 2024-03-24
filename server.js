// Importing the required modules
const http = require('http');
const express = require('express')
const path = require('path')
const viewsRoutes = require('./Routes/viewsRoutes');
// const path = require('path');
const app = express();
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use(viewsRoutes)

const port =80;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
