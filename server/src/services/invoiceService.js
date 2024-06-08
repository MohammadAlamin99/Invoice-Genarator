const invoiceModel = require("../models/invoiceModel");



exports.createInvoice = async (req) => {
    try {
        let reqBody = req.body;
        let result = await invoiceModel.create(reqBody);
        return {status:"success", message:result}
    } catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}


exports.getInvoice = async (req) => {
    try {
        let result = await invoiceModel.findOne().sort({_id: -1});
        return {status: "success", data: result};
    } catch (e) {
        return {status: "fail", message: "Something Went Wrong"};
    }
};



