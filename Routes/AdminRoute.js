// const express = require("express")

// const Router = express.Router()

// const multer  = require('multer')
// const path = require('path')

// const adminController = require("../Controller/Admin/AdminController")

// const {testimonialValidation} = require("../Middleware/Validate")
// const {memberValidation} = require("../Middleware/Validate")
// const {brandValidation} = require("../Middleware/Validate")

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./Public/Images/About/TeamMembers")
//     },
//     filename: function (req, file, cb) {
     
//       cb(null,file.originalname)
//   }})

//   const upload = multer({
//     storage:storage
//     // fileFilter:(req,file,cb)=>{
//     //     if(file.mimetype == "img/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
//     //         cb(null,true)
//     //     }else{
//     //         cb(null,false);
//     //         return  cb (new Error("Only .png ,.jpg and .jpg formats are allowed"))
//     //      }
//    //}
//   })

// // Router.get( "/paginatedcontact",adminController.paginatedContacts)
// Router.post("/admin/createtestimonials",testimonialValidation, adminController.createTestimonials)
// Router.post("/admin/createmembers",upload.single("pic"),memberValidation,adminController.createMembers)
// Router.post("/admin/createbrands",upload.single("pic"),brandValidation,adminController.createBrands)

// module.exports = Router
