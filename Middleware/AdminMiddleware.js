
const Admin = require('../Models/Admin')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const isAuthenticated = (req, res, next) => {
    
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Forbidden - Invalid token', token: token });
            }
            else {

                next();
            }
        });
    }
    else {
        res.redirect('/loginOfDashboard')
    }

};
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'User', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                console.log('an error happened');
                next();
            }

            else {

                res.locals.user = await user.findById(decodedToken.userId)
                
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
}


module.exports = {
    isAuthenticated,
}