const express = require("express")

const Router = express.Router()

const contactController = require("../../Controller/Admin/ContactController")

//const {testimonialValidation} = require("../../Middleware/Validate")
//const {memberValidation} = require("../../Middleware/Validate")
//const {brandValidation} = require("../../Middleware/Validate")



//Contact addition
Router.post("/admin/contact/createcontact", contactController.createContact)


//Contact fetching
Router.get("/admin/contact/showcontact", contactController.showContact)

Router.post("/admin/contact/statuscontact/:id",contactController.statusContact)

Router.get("/admin/contact/deletecontact/:id",contactController.deleteContact)

Router.get("/admin/contact/editcontact/:id",contactController.editContact)

Router.post("/admin/contact/updatecontact",contactController.updateContact)




module.exports = Router
