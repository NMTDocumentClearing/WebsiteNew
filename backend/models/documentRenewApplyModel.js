const mongoose = require('mongoose');

const docRenewApplicationSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true
        },
        companyname: {
            type: String,
            required: true
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        rejectReason: {
            type: String,
            default:''
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

const DocumentRenewApplication = mongoose.model('DocumentRenewApplication', docRenewApplicationSchema)

module.exports = DocumentRenewApplication;