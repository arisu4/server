const express = require("express")

const Router = express.Router()
 
const clientContactController = require("../../Controller/Frontend/ClientContactController")

Router.get("/showcontact",clientContactController.show_contact)
Router.get("/showlink",clientContactController.show_link)









module.exports = Router 



