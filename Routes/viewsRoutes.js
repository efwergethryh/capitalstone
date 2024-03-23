const express = require('express')
const pagesController = require('../Controllers/PagesController')
const router = express.Router();

router.get('/',pagesController.get_landing_page);

module.exports = router