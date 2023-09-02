const Expense = require('../database/expense')
const tryCatch = require('../utils/tryCatch')

const getExpense = tryCatch(async (req, res) => {
        const expense = await Expense.find({ createdBy: req.user.userId }).sort({createdAt: -1})
        res.status(200).json(expense)
})

const addExpense = tryCatch(async (req, res,) => {
    req.body.createdBy = req.user.userId
    const {amount} = req.body
        if (amount <= 0 || isNaN(amount)){
            return res.status(400).json('amount must be a postive number')
        }
    await Expense.create({...req.body})
    res.status(200).json('expense added')
})

const deleteExpense = tryCatch(async (req, res) => {
    const {id} = req.params;
    await Expense.findByIdAndDelete(id)
    res.status(200).json('expense deleted')
})

module.exports = {
    getExpense,
    addExpense,
    deleteExpense
}