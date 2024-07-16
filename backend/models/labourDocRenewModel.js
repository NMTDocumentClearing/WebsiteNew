const mongoose = require('mongoose');

const labourDocRenewApplicationSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        nationality: {
            type: String,
            required: true,
            default:''
        },
        position: {
            type: String,
            required: true,
            default:''
        },
        rejectReason: {
            type: String,
            default:''
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        status:{
            type: String,
            required:true,
            default: 'Pending'
        },
        viewStatus:{
            type: String,
            required:true,
            default:'Not Viewed'
        }
    },
    {
        timestamps: true,
    }
)

const labourDocRenewApplication = mongoose.model('labourDocRenewApplication', labourDocRenewApplicationSchema)

module.exports = labourDocRenewApplication;