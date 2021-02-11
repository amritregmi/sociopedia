const mongoose = require('mongoose')

const campaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'campaign name is required']
    },
    description: {
        type: String,
        required: [true,'description required']
    },
    address: {
        type: String,
        required: [true,'location is required']
    },
    date: {
        type: Date,
    },
    approved: {
        type: Boolean,
        default: false
    }
})

const Campaign = mongoose.model('Campaign', campaignSchema)

module.exports = Campaign;