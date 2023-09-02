require ('dotenv').config()
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'all fields required'],
        trim: true,
        unique: true,
        maxLenght: 50
    },
    password: {
        type: String,
        required: [true, 'all fields required'],
        trim: true,
        maxLenght: 50
    },
    income: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'income'
    },
    expense: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'expense'
    }
})

UserSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        {userId: this._id, name: this.username},
        process.env.JWT_SECRET,
        {expiresIn: 86400000}
    )
}

UserSchema.methods.ComparePassword = async function(userpassword) {
    const isMatch = await bcrypt.compare(userpassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)