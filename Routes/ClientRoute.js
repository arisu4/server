const express = require("express")

const Router = express.Router()



const contactcontroller = require("../Controller/Frontend/ClientController")

const {contactValidation} = require("../Middleware/Validate")



Router.post( "/addcontact",contactValidation,contactcontroller.addContact)


module.exports = Router
