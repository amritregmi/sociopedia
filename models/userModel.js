const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email already taken'],
        lowercase: true,
        validate: [validator.isEmail,'invalid email type']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default:'user'
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [5, 'password must be at least 8 character'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'password is required'],
        validate: {
            validator: function (passwordConfirm) {
                return passwordConfirm === this.password
            },
            message:'confirm password must match'
        }
    }
})
/**
 * @DESC Hashes password using bcrypt 
 * @RETURNS hashed password
 */
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

/**
 * @DESC instance method for user document 
 * @CHECKS if the user password is matched or not 
 * @RETURNS true or false 
 */
userSchema.methods.correctPassword = async function (candidatePassword, actualPassword) {
    // compare password using same bcrypt algorithm 
    return await bcrypt.compare(candidatePassword,actualPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User