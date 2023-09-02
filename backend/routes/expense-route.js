const {deleteExpense, addExpense, getExpense} = require('../controllers/Expense')
const express = require('express')
const router = express.Router();

router.route('/').get(getExpense).post(addExpense)
router.route('/:id').delete(deleteExpense)

module.exports = router