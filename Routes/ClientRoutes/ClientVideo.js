const express = require("express")

const Router = express.Router()
 
const clientVideoController = require("../../Controller/Frontend/ClientVideoController")

Router.get("/showvideo",clientVideoController.show_video)









module.exports = Router 