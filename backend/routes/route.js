require ('dotenv').config()
const {addIncome,getIncome,deleteIncome} = require('../controllers/Income')
const express = require('express')
const router = express.Router();

router.route('/').post(addIncome).get(getIncome)
router.route('/:id').delete(deleteIncome)

module.exports = router