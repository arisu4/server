const express = require("express")

const Router = express.Router()
 
const clientServiceController = require("../../Controller/Frontend/ClientServiceController")

Router.get("/showservice",clientServiceController.show_service)









module.exports = Router 


