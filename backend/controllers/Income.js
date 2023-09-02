const Income = require('../database/income')
const tryCatch = require('../utils/tryCatch')

const addIncome = tryCatch(async (req, res) => {
    req.body.createdBy = req.user.userId
    const {amount} = req.body
    if(amount <= 0 || isNaN(amount)){
        return res.status(400).json('amount must be a positive number')
    }
    await Income.create({...req.body})
    res.status(200).json('income added')
    }
)

const deleteIncome =tryCatch(async (req, res) => {
    const {id} = req.params
    await Income.findByIdAndDelete(id)
    return res.status(200).json('income deleted')
})

const getIncome = tryCatch(async (req, res) => {
        const income = await Income.find({createdBy: req.user.userId}).sort({createdAt: -1})
        res.status(200).json(income)
})


module.exports = {
    addIncome,
    deleteIncome,
    getIncome
}