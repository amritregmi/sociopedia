const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const User = require('../models/userModel')
const Campaign = require('../models/campaignModel')

/**
 * Creates a JWT Token 
 * @PARAM id 
 * @RETURNS token 
 */
const signToken = id => {
    const token = jwt.sign({
        id
    }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN
    })
    return token
}
/**
 * @DESC Create and send JWT token 
 * @PARAM user, statusCode, response object
 */
const createAndSendToken = (user, statusCode, res) => {
    // get token 
    const token = signToken(user._id)
    // create cookie 
    const cookieOptions = {
        expires: new Date (Date.now()+process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),//90 days
        httpOnly:true // safe cooke, no one can temper
    }
    // attach cookie to response 
    res.cookie('jwt', token, cookieOptions)
    
    user.password = undefined // don't send user password

    res.status(statusCode).json({
        status: 'success',
        token: token,
        data: {
            user
        }
    })
}
/**
 * @DESC creates an account 
 * 
 */
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role
    })
    // create jwt , create cookie and send response 
    createAndSendToken(newUser,201,res)
})

/**
 * @DESC Login System
 */
exports.login = catchAsync(async (req, res, next) => {
    //console.log(`THe cookie sent is${req.cookie.jwt}`);
    const { email, password } = req.body
    // check if if email and password exist in req
    if(!email || !password) return next(new AppError('provide email and password',400))
    
    // check if the user exist 
    const user = await User.findOne({ email }).select('+password')
    
    // compare the password using correctPassword attach in user schema
    if (!user || ! await user.correctPassword(password, user.password)) {
        return next(new AppError('Incorrect email or password',401))
    }
    // if everything ok a this point, send signed token and cookie 
    createAndSendToken(user,200,res)
})

/**
 * @DESC checks if the user is logged in or not
 * @MIDDLEWARE function
 * 
 */
exports.isLoggedIn = async (req, res, next) => {
    
    // check of there is a cookie
    if (req.cookies.jwt) {
        try {
            // Validate the token, verification! 
            const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
            
            const currentUser = await User.findById(decoded.id)
            
            if (!currentUser) {
                res.status(200).render('campaigns', {
                    title: 'All campaigns',
                    confirmedCampaignData,
                    pendingCampaignData
                })
            }

            /**
             * we have a logged in user,
             * goes to next middleware,
             * All template rendering from next middleware has access to res.locals
             */
            res.locals.user = currentUser
            return next()

        } catch (error) {
            // There is no logged in user
            return next()
        }
    }
    // no logged in user
    res.status(200).render('main', {
        title: 'main page',
    })
}

/**
 * @DESC checks if the user isAuthenticated.
 *       gets a token and verifies if the token is valid. 
 * @PARAMS token (in req.authorization.token)
 * @RETURNS goes to next function. adds Current user in req.user
 */
exports.isAuthenticated = catchAsync(async (req, res, next) => {
    let token
    //1 check if there is token in request object. as a Bearer token (FOR POSTMAN API)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.jwt) { // Or check for cookie in req.cookies 
        token = req.cookies.jwt // this way it works with postman and web request via cookies.
    }
    if (!token) {
        return next(new AppError('You are not logged in! Please log in to access', 401))
    }
    //2 Validate the token, verification! 
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

    //3 Check if the user still exist
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) return next(new AppError('The user belonging to this token no longer exist', 401))

    //4 check if user changed password after JWT was issued. 
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password, please log in again', 401))
    }

    // if user is authenticated, we attach authenticated user into req.user (NICE HACK)
    req.user = currentUser
    res.locals.user = currentUser // this helps templates to access user data anywhere
    next()
})

/**
 * @DESC Logout System
 */
exports.logout = (req, res) => {
    res.cookie('jwt', 'logged out cookie', {
        expires: new Date(Date.now() + 5 * 1000), // 5 second
        httpOnly:true,
    })
    res.status(200).json({
        status:'success'
    })
}

