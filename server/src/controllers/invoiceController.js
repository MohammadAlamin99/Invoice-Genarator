const { createInvoice, getInvoice } = require("../services/invoiceService");



exports.invoice = async (req, res) => {
    let result = await createInvoice(req);
    return res.status(200).json(result);
 }


exports.invoiceRead = async (req, res) => {
    let result = await getInvoice(req);
    return res.status(200).json(result);
 }

