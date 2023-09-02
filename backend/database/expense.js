const mongoose = require ('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'all fields required'],
        trim: true,
        maxLenght: 50
    },
    amount:{
        type: Number,
        required: [true, 'all fields required'],
        trim: true,
        maxLenght: 30
    },
    category:{
        type: String,
        required: [true, 'all fields required'],
        trim: true,
    },
    description:{
        type: String,
        required: [true, 'all fields required'],
        trim: true,
    },
    type: {
        type: String,
        default:'expense'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model('Expense', ExpenseSchema)