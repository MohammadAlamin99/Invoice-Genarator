const express = require("express");
const invoiceController = require("../controllers/invoiceController");


const router = express.Router();

router.post("/invoice", invoiceController.invoice);
router.get("/invoiceRead", invoiceController.invoiceRead);






module.exports = router;