const express = require("express")

const Router = express.Router()
 
const clientStoryController = require("../../Controller/Frontend/ClientStoryController")

Router.get("/showstory",clientStoryController.show_story)









module.exports = Router 