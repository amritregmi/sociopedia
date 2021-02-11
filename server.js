const mongoose = require('mongoose')
const dotenv = require('dotenv')
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
})
module.exports = server