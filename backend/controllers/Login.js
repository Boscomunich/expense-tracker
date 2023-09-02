const { response } = require('express')
const User = require('../database/User')
const tryCatch = require('../utils/tryCatch')

const RegisterUser = tryCatch(async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(200).json({username:user.username,id: user._id, token:token})
})

const Login = tryCatch(async (req, res) => {
    const {username, password} = req.body
    if(!username || !password) {
        return res.status(400).json('please enter login details')
    }
    //checks if user exists in the User schema
    const user = await User.findOne({username})
    if(!user){
        return res.status(400).json('wrong username or password')
    }
    //compare password with the saved password in the User schema using the ComparePassword methode in the User Schema  
    const isPasswordCorrect = await user.ComparePassword(password)
    if(!isPasswordCorrect) {
        return res.status(400).json('wrong username or password')
    }
    //create jwt token using the creatJWT methode in the User Schema
    const token = user.createJWT()
    res.status(200).json({username:user.username,id: user._id, token:token})
})

module.exports = {RegisterUser, Login}