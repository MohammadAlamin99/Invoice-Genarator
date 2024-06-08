const contactModel = require("../models/contactModel");



exports.createContact = async (req) => {
    try {
        let reqBody = req.body;
        let result = await contactModel.create(reqBody);
        return {status:"success", message:result}
    } catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}



exports.allContact = async (req) => {
    try {

        let result = await contactModel.find()
        return({status:"success", data:result});
    } catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}


exports.deleteContact = async (req, res)=>{
    try {
        let id = req.params.id;
        let matchItemDelete = {_id:id};
        let data = await contactModel.deleteOne(matchItemDelete)
        return({status:"success", data:data});

    } catch (e) {
        return {status:"fail", message:"something went wrong"}
    }
}


exports.updateContact = async (req, res)=>{
    try {
        let id = req.body.id;
        let reqBody = req.body;
        let data = await contactModel.updateOne({_id:id},reqBody);
        return({status:"success", data:data});

    } catch (e) {
        return {status:"fail", message:e.message}
    }
}



