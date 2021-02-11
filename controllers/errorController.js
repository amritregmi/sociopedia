const AppError = require('../utils/appError')

// handles duplicate error coming from mongo
const handleDuplicateFieldDB = err => {
    const message = `${err.keyValue.email}, already taken. Please use other email`
    return new AppError(message, 400)
}
// handles validation error coming from mongo
const handleValidationErrorDB = err => {
    let errors = Object.values(err.errors).map(el => el.properties.message)
    const message = `Invalid Input Data: ${errors.join('. ')}`

    return new AppError(message, 400)
}
/**
 * @DESC Error Controller that handles all error for project 
 * @PARAM Object - err,req,res; function next
 */
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    
    if (process.env.NODE_ENV === 'development') {
        sendErrorForDev(err, req, res)
        
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err }

        if (error.code === 11000) error = handleDuplicateFieldDB(error)
        if (error.errors) error = handleValidationErrorDB(error)
        sendErrorForProd(error, req, res)
    }
    
}
// sends all error (To track, only in dev )
const sendErrorForProd = (err, req, res) => {
    // API ERROR
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })
    }
    //RENDERED WEBSITE
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong',
        message: err.message
    })

    
}
// Sends Production error, not exposing our interior function. 
const sendErrorForDev = (err, req, res) => {
    if (err.operational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
    return res.status(500).json({
        status: 500,
        message: 'Something went wrong!'
    })
}