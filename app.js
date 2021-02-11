const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const compression = require('compression')

const globalErrorHandler = require('./controllers/errorController')
const userRouter = require('./routes/userRoute')
const viewRouter = require('./routes/viewRoute')
const campaignRouter = require('./routes/campaignRoute')

const AppError = require('./utils/appError')

const app = express()

// set pug engine 
app.set('view engine', 'pug')
// load views template form views folder 
app.set('views',path.join(__dirname,'views'))
// serve static file 
app.use(express.static(path.join(__dirname,'public')))

// compression 
app.use(compression())
// loges request coming to the app 
app.use(morgan('dev'))

// allow cors
app.use(cors())

// Body parser, reads data from body into req.body. Max size 10KB
app.use(express.json({
    limit: '10kb'
}))
// use cookie parser, basically parses all cookie from incoming request
app.use(cookieParser())
// custom middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    console.log(`Request coming at: ${new Date(Date.now())}`);
    req.cookies.jwt ? console.log('****cookie coming along***') : console.log('No cookie');
    req.token = req.cookies.jwt
    next()
})

// Route for API 
app.use('/api/users', userRouter)

// Route for campaign API 
app.use('/api/campaign', campaignRouter)

// Route for Front end or to get Template 
app.use('/', viewRouter)

// if any of the routes are not handled then 
app.all('*', (req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on this server`, 400)
    next(err)
})

// Error Middleware Function 
app.use(globalErrorHandler)

module.exports = app 