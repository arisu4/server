const db = require('../../Model/IndexModel')
const gallery = require('../../Model/Gallery')
const { validationResult } = require('express-validator')
const { Op } = require('sequelize')

const Gallery= db.gallery


//Gallery add
// const createGallery = async (req, res) => {
//    console.log(req.file)
//    let errors = validationResult(req)
//     console.log("gallery errors",errors)

//    if (!req.file) {
//       res.json({message:`Please choose an image of type jpg, jpeg, png or webp.` })
//    } else if(!errors.isEmpty()){
//       res.status(420).json({ status: 0, errors: errors.array() })
//    }else {
      
//       let info = {
//          title: req.body.title,
//           image: req.file.filename,
//         }
//       console.log(info)
//       const galleries = await Gallery.create(info)
//          .then(data => {
//             if (data) {
//                res.status(200).json({ status: 1, message: `Added Gallery Successfully` })
//             }
//          })
//       .catch((error) => {

//          res.status(500).json({status: 0, message:`Something went wrong.`})
//       })
//    }
//       }
// }

// const createGallery = async (req, res) => {
//    // console.log(req.file)
//    let errors = validationResult(req)
//          console.log("gallery errors",errors)
//    // if (!req.file) {
//    //    res.json({message:`Please choose an image of type jpg, jpeg, png or webp.` })
//    // } else 
  
//    if(!req.file) {
    
//       if(!errors.isEmpty()){
//          res.status(420).json({ status: 0, errors: errors.array()})
//        } 

//    }else{
//       let info = {
//          title: req.body.title,
//          image: req.file.filename,
//         }
//       const galleries = await Gallery.create(info)
//          .then(data => {
//             if (data) {
//                res.status(200).json({ status: 1, message: `Added Gallery Successfully` })
//             }
//          })
//      }
//    }


      // .catch((error) => {

   //    //    res.status(500).json({status: 0, message:`Something went wrong.`})
   //    // })
   // }

   // Gallery create
   const createGallery = async(req,res) => {
   
      console.log(req.body)
      console.log(req.file)
     const errors = validationResult(req)
     console.log('gallery error',errors)
       
     if (!errors.isEmpty() ) {
        res.status(420).json({ status: 0, errors: errors.array() })
     
     } else{
        let info = {
           title: req.body.title, 
           image: req.file.filename
        }
     
        const gallery = await Gallery.create(info)
           .then(data => {
              if (data) {
                 res.status(200).json({ status: 1, message: `Added Content Successfully.` })
              }
           })
     }
     }


     const showGallery = async (req, res) => {
      const page = parseInt(req.query.page)
      const pageSize = parseInt(req.query.pageSize)
      const search = req.query.search
      const startIndex = (page - 1) * pageSize
      const endIndex = page * pageSize
   
      if (!search || search == "undefined") {
         await Gallery.findAll({ raw: true })
            .then(galleries => {
               const paginatedGalleries = galleries.slice(startIndex, endIndex)
               const totalPages = Math.ceil(galleries.length / pageSize)
               res.status(200).json({ galleries: paginatedGalleries, totalPages })
   
            })
      } else {
         await Gallery.findAll({
            where: {
               title: {
                  [Op.like]: "%" + search + "%"
               },
            },
            raw: true
         })
            .then(galleries => {
               const paginatedGalleries = galleries.slice(startIndex, endIndex)
               const totalPages = Math.ceil(galleries.length / pageSize)
               res.status(200).json({ galleries: paginatedGalleries, totalPages })
            })
   
      }
   }
   
   
   //Gallery status
   const statusGallery = async(req,res)=>{
      console.log(`staus id`,req.params.id)
      const id = req.params.id
      let galleryexists =  await Gallery.findOne({
         where: {
            id: id
         },
         raw: true
      })
      if (galleryexists.status === "1") {
         const queries = {
            status:"0"
         }
         await Gallery.update(queries, { where: { id: id } })
         .then(() => {
            res.status(200).json({ flag: 1, message: 'Blocked content successfully' })
         })
      }else if(galleryexists.status === "0"){
         const queries ={
            status:"1"
         }
         await Gallery.update(queries, { where: { id: id } })
         .then(() => {
            res.status(200).json({ flag: 1, message: 'Unblocked content successfully' })
         })
      }
   }
   
   //Gallery delete
   const deleteGallery = async (req, res) => {
      console.log(`id `, req.params.id)
      const id = req.params.id
      await Gallery.destroy({
         where: { id: id }
      })
         .then(() => {
            res.status(200).json({ status: 1, message: 'Deleted content successfully' })
         }
         )
   }
   
   
   //Gallery edit
   const editGallery = async (req, res) => {
      console.log('this is edit function')
      const id = req.params.id
      console.log(`editing ids`, req.params.id)
      await Gallery.findOne({
         where: {
            id: id
         },
         raw: true
      })
         .then(galleries => {
            res.status(200).json({ editgalleries: galleries })
         })
   }
   
   
   //Gallery update
   const updateGallery = async(req, res) => {

     
      const id = req.body.id
      console.log(`gallery  id`,id)
      const galleries = {
         title: req.body.title,
         image: req.file.filename
      }
      await Gallery.update(galleries, { where: { id: id } })
         .then(() => {
            res.status(200).json({ status: 1, message: 'Updated gallery successfully' })
         })
   }
   






   
   // const showGallery = async(req,res)=>{
   //  const page = parseInt(req.query.page)
   //  const pageSize = parseInt(req.query.pageSize)

   // const startIndex = (page - 1) * pageSize
   // const endIndex = page * pageSize

   // const galleries = await Gallery.findAll({raw:true})
   //     .then(galleries => {
   //         const paginatedGalleries = galleries.slice(startIndex, endIndex)
   //         const totalPages = Math.ceil(galleries.length/ pageSize)
   //         res.status(200).json({ galleries: paginatedGalleries, totalPages })
   //     })

   // }



module.exports={
createGallery,
showGallery,
statusGallery,
deleteGallery,
editGallery,
updateGallery
}