const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    email:{type:String},
    phone:{type:String},
    address:{type: String},
    PickupDate:{type:Date},
    ReturnDate:{type:Date},
    Duration:{type:String},
    Discount:{type:String},
    VehicleType :{type:String},
    Vehicle :{type:String},
    DurationCharge :{type:String},
    CollisionDamageWaiver :{type:String},
    LiabilityInsurance  :{type:String},
    RentalTax :{type:String},
    charge :{type:String},
    Total :{type:String},
    createdDate: {type:Date, default:Date.now()}
},{versionKey: false})

const invoiceModel = mongoose.model('invoice', dataSchema);
module.exports = invoiceModel;



