const express = require('express');

const campaignController = require('../controllers/campaignController')

const router = express.Router()

router
    .route('/') // api/campaign/
    .get(campaignController.getAllCampaign)
    .post(campaignController.createCampaign)

router
    .route('/:id')  // api/campaign/1234ID
    .get(campaignController.getCampaign)
    .patch(campaignController.updateCampaign)
    .delete(campaignController.deleteCampaign)

module.exports = router