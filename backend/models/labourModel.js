const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs')

const labourSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        nationality: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        company:{
            type: String,
            required: true
        },
        image:{
            type: Object,
            required: true
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        labourCardExpiry: {
            type: Date,
            required: true
        },
        labourCardNumber:{
            type: Number,
            default:1234
        },
        idCardExpiry:{
            type: Date,
            required: true
        },
        idCardNumber:{
            type: Number,
            default:1234
        },
        status:{
            type: String,
            required:true,
            default: 'Active'
        }
    },
    {
        timestamps: true,
    }
)

const Labour = mongoose.model('Labour', labourSchema)

module.exports = Labour;