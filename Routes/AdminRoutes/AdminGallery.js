const express = require("express")

const Router = express.Router()

const multer  = require('multer')
const path = require('path')
const {galleryValidation} = require("../../Middleware/Validate")

//const {check} = require("express-validator")


const galleryController = require("../../Controller/Admin/GalleryController")


const gallerystorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./../client/public/assets/imgs/gallery")  
    },
    filename: function (req, file, cb) {
     
      //cb(null,file.originalname)
      //cb(null, Date.now() + path.extname(file.originalname))
      cb(null, Date.now() +"-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }})
  
  const uploadgallery = multer({
    storage:gallerystorage,
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
  
Router.post("/admin/gallery/creategallery",uploadgallery.single('image'),galleryValidation,galleryController.createGallery)

Router.get("/admin/gallery/showgallery",galleryController.showGallery)

Router.post("/admin/gallery/statusgallery/:id",galleryController.statusGallery)

Router.get("/admin/gallery/deletegallery/:id",galleryController.deleteGallery)

Router.get("/admin/gallery/editgallery/:id",galleryController.editGallery)

const updateGalleryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../client/public/assets/imgs/gallery")  
  },
  filename: function (req, file, cb) {
   
    //cb(null,file.originalname)
    //cb(null, Date.now() + path.extname(file.originalname))
    cb(null, Date.now() +"-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
}})

const updategallery = multer({
  storage:updateGalleryStorage,
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

Router.post("/admin/gallery/updategallery",updategallery.single('image'),galleryController.updateGallery)


module.exports= Router