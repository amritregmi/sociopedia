const express = require('express')
const viewsController = require('../controllers/viewsController')
const authController = require('../controllers/authController')
const campaignController = require('../controllers/campaignController')


const router = express.Router()

// template rendering 

router.get('/', authController.isLoggedIn, viewsController.getCampaigns)
router.get('/login', viewsController.getLoginForm)
router.get('/signup', viewsController.getSignUpForm)

router.get('/addCampaign',authController.isLoggedIn,viewsController.getCampaignForm)

module.exports = router