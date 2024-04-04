const express = require('express')
const multer  = require('multer');
const pagesController = require('../Controllers/PagesController')
const AdminController = require('../Controllers/AdminController');
const { isAuthenticated } = require('../Middleware/AdminMiddleware');
const Admin = require('../Models/Admin');
const router = express.Router();
const storage = multer.diskStorage({
    // Define where to store the uploaded files
    destination: function (req, file, cb) {
        cb(null, 'public/images/products/'); // Save files to the 'uploads' directory
    },
    // Define how to name the uploaded files
    filename: function (req, file, cb) {
        // Use the original file name with a timestamp prefix to ensure uniqueness
        const timestamp = Date.now(); // Get the current timestamp
        const filename = `${timestamp}-${file.originalname}`; // Prefix with timestamp
        cb(null, filename); // Callback with the generated filename
    }
});
const upload = multer({
    storage: storage,
});
router.get('/',pagesController.get_landing_page);
router.get('/Products',pagesController.get_allpics);
router.get('/dashboard',isAuthenticated,pagesController.dashboard_page);
router.get('/loginOfDashboard',AdminController.loginPage);
router.post('/api/login',AdminController.login);
router.post('/Products/add',isAuthenticated ,upload.single('picture'),AdminController.add_products)
router.post('/api/register',AdminController.register)
router.delete('/api/products/:id',isAuthenticated, AdminController.delete_product);
router.get('/api/logout',isAuthenticated, AdminController.logout)
router.put('/api/Products/:id',upload.single('picture'),AdminController.update_product )
module.exports = router



