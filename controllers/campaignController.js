const AppError = require('./../utils/appError')
const catchAsync = require('../utils/catchAsync')
const Campaign = require('../models/campaignModel')
const { resolveSoa } = require('dns')



// CRUD OPERATION

// create a campaign 
exports.createCampaign = catchAsync(async (req, res, next) => {
    const campaign = await Campaign.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            campaign
        }
    })
})
// get single campaign 
exports.getCampaign = catchAsync(async (req, res, next) => {
    const campaign = await Campaign.findById(req.params.id)
    res.status(200).json({
        status: 'success',
        data: {
            campaign
        }
    })
})
// get all campaign 

exports.getAllCampaign = catchAsync(async (req, res, next) => {
    const campaigns = await Campaign.find()

    res.status(200).json({
        status: 'success',
        result: campaigns.length,
        data: {
            campaigns
        }
    })
})

// delete campaign 
exports.deleteCampaign = catchAsync(async (req, res, next) => {
    const campaign = await Campaign.findByIdAndDelete(req.params.id)

    if(!campaign){
        return next(new AppError('no document found with that ID',404))
    }
    res.status(200).json({
        status: 'success',
    })

    
})

// update campaign 
exports.updateCampaign = catchAsync(async (req, res, next) => {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators:true
    })
    if (!campaign) {
        return next(new AppError ('no document found',404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            campaign
        }
    })
})