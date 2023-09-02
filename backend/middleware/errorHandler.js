const errorHandler = (error,req,res,next) => {
    //console.log(error)
    if (error.code === 11000){
        return res.status(400).json('user exists, try another username')
    }
    const Error = Object.values(error)[0]
    const Message = Object.values(Error)[0]
    return res.status(400).json(Message.message);
}
module.exports = errorHandler