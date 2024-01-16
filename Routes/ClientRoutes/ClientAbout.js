const express = require("express")

const Router = express.Router()
 
const clientAboutController = require("../../Controller/Frontend/ClientAboutController")

Router.get("/showteam",clientAboutController.show_team)
Router.get("/showtestimonial",clientAboutController.show_testimonial)
Router.get("/showbrand",clientAboutController.show_brand)








module.exports = Router 




