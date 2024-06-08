const express = require("express");
const contactController = require("../controllers/contactController");


const router = express.Router();

router.post("/addContact", contactController.addContact);
router.get("/allContact", contactController.allContact);
router.get("/deleteCon/:id", contactController.deleteCon);
router.post("/updateCon", contactController.updateCon);





module.exports = router;