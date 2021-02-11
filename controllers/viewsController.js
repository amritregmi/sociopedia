const AppError = require('./../utils/appError')
const catchAsync = require('../utils/catchAsync')
const Campaign = require('../models/campaignModel')
const { async } = require('q')
const { raw } = require('body-parser')

exports.getLoginForm = (req, res) => {
    res.status(200).render('login', { title: 'Login Page' })
    
}
exports.getSignUpForm = (req, res) => {
    res.status(200).render('signup',{title:'Signup Page'})
}


exports.getCampaigns = catchAsync(async (req, res) => {
    // get all campaigns
    const confirmedCampaignData = await Campaign.find({ approved: true })
    const pendingCampaignData = await Campaign.find({approved:false})

    
    res.status(200).render('campaigns', {
        title: 'All campaigns',
        confirmedCampaignData,
        pendingCampaignData
    })
})

exports.getCampaignForm = (req, res) => {
    res.status(200).render('campaignForm', { title: 'Campaign Form' })
}