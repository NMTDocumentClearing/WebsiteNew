const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs')

const recieptSchema = mongoose.Schema(
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
        note:{
            type:String
        }
    },
    {
        timestamps: true,
    }
)

const Reciept = mongoose.model('Reciept', recieptSchema)

module.exports = Reciept;