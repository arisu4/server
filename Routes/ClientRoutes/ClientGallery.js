const express = require("express")

const Router = express.Router()
 
const clientGalleryController = require("../../Controller/Frontend/ClientGalleryController")

Router.get("/showgallery",clientGalleryController.show_gallery)









module.exports = Router 