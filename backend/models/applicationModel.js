const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema(
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
            default:''
        },
        position: {
            type: String,
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
        other:{
            type: String,
            default:''
        },
        image:{
            type: Object,
            default:{}
        },
        passport:{
            type: Object,
            default:{}
        },
        passportback:{
            type: Object,
            default:{}
        },
        visitvisa: {
            type: Object,
            default:{}
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
        },
        progress: {
            type:Array,
            default:[
                {
                    label:'OfferLetter',
                    status: false
                },
                {
                    label:'LabourPayment',
                    status: false
                },
                {
                    label:'Insurance',
                    status: false
                },
                {
                    label:'EntryPermit',
                    status: false
                },
                {
                    label:'Inout',
                    status: false
                },
                {
                    label:'ILOE',
                    status: false
                },
                {
                    label:'Medical',
                    status: false
                },
                {
                    label:'Thoujeeh',
                    status: false
                },
                {
                    label:'IdStamping',
                    status: false
                }
            ]
        }
    },
    {
        timestamps: true,
    }
)

const Application = mongoose.model('Application', applicationSchema)

module.exports = Application;