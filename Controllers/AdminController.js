const Product = require('../Models/Product')
const Admin = require('../Models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const add_products = (req, res) => {
    const { description } = req.body

    const picture = req.file.filename

    const product = new Product({ description: description, path: picture })

    product.save();
    res.status(200).json({ message: 'Product Added Successfully' })
}
const createToken = (id) => {

    const token = jwt.sign({ userId: id }, process.env.SECRET_KEY, { expiresIn: '1h' })
    return token
}
const logout = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out ' })
}
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ error: 'You are not Authorized!' });
        }
        const passwordMatch = await  bcrypt.compare(password, admin.password)

        if (!passwordMatch) {    
            return res.status(401).json({ error: 'Wrong credentials' });
        }

        const token = createToken(admin._id)
        
        res.cookie(
            "jwt",
            token,
            {
                maxAge: 3600000,
                httpOnly: true
            });

        res.status(201).json({ message: 'Logged in successfully' });
    } catch (error) {
        console.log(error);
    }
}

const loginPage = (req, res) => {
    res.render('login_page')
}
async function hashPassword(password) {
    const saltRounds = 10; // Number of salt rounds
    return await bcrypt.hash(password, saltRounds);
}
async function insertUser(username, password) {
    const hashedPassword = await hashPassword(password);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();
}
const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        await insertUser(username, password);
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = {
    add_products,
    loginPage,
    login,
    register, logout
}