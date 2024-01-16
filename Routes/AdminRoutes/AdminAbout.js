const express = require("express")

const Router = express.Router()

const multer  = require('multer')
const path = require('path')

//const  {v4:uuidv4}  = require('uuid');



const aboutController = require("../../Controller/Admin/AboutController")

const {testimonialValidation} = require("../../Middleware/Validate")
const {memberValidation} = require("../../Middleware/Validate")
const {brandValidation} = require("../../Middleware/Validate")
const {videoValidation} = require("../../Middleware/Validate")




 



//Testimonial addition
Router.post("/admin/about/createtestimonials",testimonialValidation, aboutController.createTestimonials)

//Testimonial searching
Router.post("/admin/about/createtestimonials",testimonialValidation, aboutController.createTestimonials)

//Testimonial fetching
Router.get("/admin/about/showtestimonials",aboutController.showTestimonials)

Router.post("/admin/about/statustestimonial/:id",aboutController.statusTestimonial)

Router.get("/admin/about/deletetestimonial/:id",aboutController.deleteTestimonial)

Router.get("/admin/about/edittestimonial/:id",aboutController.editTestimonial)

Router.post("/admin/about/updatetestimonial",aboutController.updateTestimonial)





//Team member addition
const storageteam = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../client/public/assets/imgs/team")  
  },
  filename: function (req, file, cb) {
   
    //cb(null,file.originalname)
    //cb(null, Date.now() + path.extname(file.originalname))
    cb(null, Date.now() +"-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
}})

const uploadteam = multer({
  storage:storageteam,
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

Router.post("/admin/about/createmembers",uploadteam.single('image'),memberValidation,aboutController.createMembers)

//Team member fetching

Router.get("/admin/about/showmembers",aboutController.showMembers)

Router.post("/admin/about/statusmember/:id",aboutController.statusMember)

Router.get("/admin/about/deletemember/:id",aboutController.deleteMember)

Router.get("/admin/about/editmember/:id",aboutController.editMember)

const updateMemberStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../client/public/assets/imgs/team")  
  },
  filename: function (req, file, cb) {
   
    //cb(null,file.originalname)
    //cb(null, Date.now() + path.extname(file.originalname))
    cb(null, Date.now() +"-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
}})

const updatemember = multer({
  storage:updateMemberStorage,
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

Router.post("/admin/about/updatemember",updatemember.single('image'),aboutController.updateMember)






//Brand addition
const storagebrand = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../client/public/assets/imgs/brand")
  },
  filename: function (req, file, cb) {
   
    //cb(null,file.originalname)
    
    cb(null, Date.now() +"-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname));

}})



const uploadbrand= multer({
  storage:storagebrand,
  fileFilter:(req,file,cb)=>{
    
      if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/webp" || file.mimetype == "image/jpeg"){
          cb(null,true)
      }else{
          cb(null,false);
          //return  cb (json.stringify(new Error("Only .png .jpg and .jpeg formats are allowed")))

       }
 }

})

Router.post("/admin/about/createbrands",brandValidation,uploadbrand.single("image"),aboutController.createBrands)

//Brand Fetching

Router.get("/admin/about/showbrands",aboutController.showBrands)

//Brand deletion

Router.get("/admin/about/deletebrand/:id",aboutController.deleteBrand)





// video addition
Router.post("/admin/about/createvideos",videoValidation,aboutController.createVideos)

// video fetching
Router.get("/admin/about/showvideos",aboutController.showVideos)

//video deletion

Router.get("/admin/about/deletevideo/:id",aboutController.deleteVideo)







//story addition
const storystorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../client/public/assets/imgs/story")
  },
  filename: function (req, file, cb) {
   
    //cb(null,file.originalname)
    
    cb(null, Date.now() +"-" + Math.round(Math.random() * 1E9) + path.extname(file.originalname));

}})


const uploadstory= multer({
  storage:storystorage,
  fileFilter:(req,file,cb)=>{
    
      if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/webp" || file.mimetype == "image/jpeg"){
          cb(null,true)
      }else{
          cb(null,false);
          //return  cb (json.stringify(new Error("Only .png .jpg and .jpeg formats are allowed")))

       }
 }

});



Router.post("/admin/about/createstory",uploadstory.array("image",4),aboutController.createStory)

//Story fetching

Router.get("/admin/about/showstory",aboutController.showStory)




module.exports = Router
