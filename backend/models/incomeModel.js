const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs')

const incomeSchema = mongoose.Schema(
    {
        date: {
            type:Date,
            required:true
        },
        company: {
            type: String,
            required: true
        },
        labour: {
            type: String,
            required: true
        },
        particular: {
            type: String,
            required: true
        },
        sale: {
            type: Number,
            required: true
        },
        purchase:{
            type: Number,
            required: true
        },
        profit:{
            type: Number,
            required: true
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Admin",
            required: true
        },
        paidBy:{
            type: String,
            default:''
        },
        status:{
            type: String,
            required:true,
            default: 'Pending'
        }
    },
    {
        timestamps: true,
    }
)

const Income = mongoose.model('Income', incomeSchema)

module.exports = Income;