import mongoose from "mongoose";

const deliveryAssignmentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },
    shopOrderId:{
         type: mongoose.Schema.Types.ObjectId,
         required:true
    },
    brodcastedTo:[              // to which delivery person this order send to accept
        {
         type: mongoose.Schema.Types.ObjectId,
         ref:"User"
    }
    ],
    assignedTo:{        //whi accept it
        type: mongoose.Schema.Types.ObjectId,
         ref:"User",
         default:null
    },
    status:{        // is this completed 
        type:String,
        enum:["brodcasted","assigned","completed"],
        default:"brodcasted"
    }
    ,
    acceptedAt:Date
}, { timestamps: true })

const DeliveryAssignment=mongoose.model("DeliveryAssignment",deliveryAssignmentSchema)
export default DeliveryAssignment