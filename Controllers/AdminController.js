const Product = require('../Models/Product')
const Admin = require('../Models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs');
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
        const passwordMatch = bcrypt.compare(password, admin.password).then(function (result) {
            console.log(result);
        });
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
const delete_product = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findById(id);
        const imagePath = `public/images/products/${product.path}`; // Adjust the path as per your file structure
        fs.unlinkSync(imagePath);
        // Find and delete the item by ID
        const deletedItem = await Product.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(deletedItem);
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
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
const update_product = async (req, res)=>{
    const productId = req.params.id;
    const { description } = req.body; // Assuming you want to update only the description for now
    const picture = req.file.filename;
    try {

        // Find the product by ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update the product's description
        product.description = description;
        product.path = picture;
        // Save the updated product
        await product.save();

        // Respond with the updated product
        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = {
    add_products,
    loginPage,
    login,
    register, logout,
    delete_product,
    update_product
}