const mongoose = require('mongoose')
const dotenv = require('dotenv')

/**
 * @LISTENING to uncaught exception first.
 * if any bugs happens in system, will run this code and stop server
 */
process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    //console.log(error);
    console.log('UNCAUGHT EXCEPTION ! SHUTTING DOWN SERVER...');
    process.exit(1)
})

dotenv.config()
const app = require('./app')

const DB = process.env.DB_LINK.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
)
// connect to mongodb Atlas
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
}).then(conn => {
    console.log('connected to database');
}).catch(err => {
    console.log('Refused: database connection');
})

const port = process.env.PORT || 3000
// run the server
const server = app.listen(port, () => {
    console.log(`social awareness running on https://127.0.0.1:${port}`);
    if (process.env.NODE_ENV === 'production') {
        console.log('IN PRODUCTION MODE');
    } else {
        console.log('DEV MODE');
    }
})
/**
 * @LISTENING to Unhandled Rejection first.
 * if any bugs happens in system, will run this code and stop server
 * @EXAMPLE mongo authentication failed is not handled 
 */
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION! SHUTTING DOWN SERVER...');
    server.close(() => {
        process.exit(1)
    })
})
/**
 * @DESC We start our app every 24 hrs to keep in good health. 
 * @HEROKU does this by sending sigterm signal to our node app 
 * @THEN our app shut downs immediately. 
 * @SO this shutdown can be very bad, leaves current state in dry
 * SIG TERM WILL CAUSE OUR APPLICATION TO SHUT DOWN 
 */
process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED.. Shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    })
})


module.exports = server