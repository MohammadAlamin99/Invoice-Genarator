const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    phone:{type:String},
    address:{type: String},
    photo:{type:String},
    createdDate: {type:Date, default:Date.now()}
},{versionKey: false})

const contactModel = mongoose.model('contact', dataSchema);
module.exports = contactModel;



