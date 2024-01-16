const express = require("express")

const Router = express.Router()

const multer  = require('multer')
const path = require('path')




const serviceController = require("../../Controller/Admin/ServiceController")
const {serviceValidation} = require("../../Middleware/Validate")


const servicestorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./../client/public/assets/imgs/service")  
    },
    filename: function (req, file, cb) {
     
      //cb(null,file.originalname)
      //cb(null, Date.now() + path.extname(file.originalname))
      cb(null, Date.now() +"-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }})
  
  const uploadservice = multer({
    storage:servicestorage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"|| file.mimetype == "image/webp" ){
            cb(null,true)
        }else{
          
            cb(null,false);
            //  cb (new Error("Only .png ,.jpg and .jpg formats are allowed"))
            //cb ({success:false,message:"Only .png ,.jpg and .jpg formats are allowed"})
         }
   }
  })
  
  //const uploadTeamImage = uploadteam.single('picteam')
  //uploadteam.single("picteam")
  
  Router.post("/admin/services/createservice",uploadservice.single('image'),serviceValidation,serviceController.createService)
  
  Router.get("/admin/services/showservice",serviceController.showService)

  Router.post("/admin/service/statusservice/:id",serviceController.statusService)

Router.get("/admin/service/deleteservice/:id",serviceController.deleteService)

Router.get("/admin/service/editservice/:id",serviceController.editService)

const updateServiceStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../client/public/assets/imgs/service")  
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() +"-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
}})

const updateservice = multer({
  storage:updateServiceStorage,
  fileFilter:(req,file,cb)=>{
      if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"|| file.mimetype == "image/webp" ){
          cb(null,true)
      }else{
          cb(null,false);
       }
 }
})

Router.post("/admin/service/updateservice",updateservice.single('image'),serviceController.updateService)



  module.exports= Router