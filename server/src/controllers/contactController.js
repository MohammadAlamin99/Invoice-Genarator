const { createContact, allContact, deleteContact, updateContact } = require("../services/contactService");




exports.addContact = async (req, res) => {
    let result = await createContact(req);
    return res.status(200).json(result);
 }


exports.allContact = async (req, res) => {
    let result = await allContact(req);
    return res.status(200).json(result);
 }


exports.deleteCon = async (req, res) => {
    let result = await deleteContact(req);
    return res.status(200).json(result);
 }
exports.updateCon = async (req, res) => {
    let result = await updateContact(req);
    return res.status(200).json(result);
 }





