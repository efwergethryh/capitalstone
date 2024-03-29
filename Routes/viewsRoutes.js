const express = require('express')
const pagesController = require('../Controllers/PagesController')
const messagingController = require('../Controllers/messagingController')
const router = express.Router();

router.get('/',pagesController.get_landing_page);
router.get('/Products',pagesController.get_allpics);
router.post('/api/send',messagingController.sendMessage);
module.exports = router