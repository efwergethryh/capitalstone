const express = require('express')
const pagesController = require('../Controllers/PagesController')
const router = express.Router();

router.get('/',pagesController.get_landing_page);
router.get('/Products',pagesController.get_allpics);
module.exports = router