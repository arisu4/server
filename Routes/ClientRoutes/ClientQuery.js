const express = require("express")

const Router = express.Router()
 
const clientQueryController = require("../../Controller/Frontend/ClientQueryController")

Router.get("/showquery",clientQueryController.show_query)









module.exports = Router 
