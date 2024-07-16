const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs')

const expenceSchema = mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        particular: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Admin",
            required: true
        },
        paidBy:{
            type:String,
            required: true
        },
        note:{
            type:String
        }
    },
    {
        timestamps: true,
    }
)

const Expence = mongoose.model('Expence', expenceSchema)

module.exports = Expence;