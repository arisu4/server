const express = require("express")

const Router = express.Router()

const{queryValidation} = require("../../Middleware/Validate")




const homeController = require("../../Controller/Admin/HomeController")

//const {testimonialValidation} = require("../../Middleware/Validate")


//Testimonial addition
Router.post("/admin/home/createfaq",queryValidation,homeController.createFaq)


Router.get("/admin/query/showquery",homeController.showQuery)

//Router.get("/admin/query/search",homeController.searchQuery)
Router.post("/admin/query/statusquery/:id",homeController.statusQuery)

Router.get("/admin/query/deletefaq/:id",homeController.deleteQuery)

Router.get("/admin/query/editfaq/:id",homeController.editQuery)

Router.post("/admin/query/updatefaq",homeController.updateQuery)

module.exports = Router

