const db = require('../../Model/IndexModel')
const service = require('../../Model/IndexModel')
const { validationResult } = require('express-validator')
const { Op } = require('sequelize')

const Service= db.service


//Service add
// const createService = async (req, res) => {

//    const errors = validationResult(req)
//    console.log(errors)
   

//    if (!errors.isEmpty()) {
//       res.status(420).json({ status: 0, errors: errors.array() })
//    } else {
//       let info = {
//          title: req.body.title,
//          description: req.body.description,
//          image: req.file.filename,
//         }
//       console.log(info)
//       const galleries = await Service.create(info)
//          .then(data => {
//             if (data) {
//                res.status(200).json({ status: 1, message: `Added Services Successfully` })
//             }
//          })
//       // .catch((error) => {

//       //    res.status(500).json({status: 0, message:`Something went wrong.`})
//       // })
//    }
// }

const createService = async(req,res) => {
   
   console.log(req.body)
   console.log(req.file)
  const errors = validationResult(req)
  console.log('gallery error',errors)
    
  if (!errors.isEmpty() ) {
     res.status(420).json({ status: 0, errors: errors.array() })
  
  } else{
     let info = {
        title: req.body.title,
        description:req.body.description, 
        image: req.file.filename
     }
  
     const service = await Service.create(info)
        .then(data => {
           if (data) {
              res.status(200).json({ status: 1, message: `Added Services Successfully.` })
           }
        })
  }
  }



// Service Fetch

// const showService = async(req,res)=>{
//    const page = parseInt(req.query.page)
//    const pageSize = parseInt(req.query.pageSize)

//   const startIndex = (page - 1) * pageSize
//   const endIndex = page * pageSize

//   const services = await Service.findAll({raw:true})
//       .then(services => {
//           const paginatedServices = services.slice(startIndex, endIndex)
//           const totalPages = Math.ceil(services.length/ pageSize)
        
//           res.status(200).json({ services: paginatedServices, totalPages })
//       })
// }

const showService = async (req, res) => {
   const page = parseInt(req.query.page)
   const pageSize = parseInt(req.query.pageSize)
   const search = req.query.search
   const startIndex = (page - 1) * pageSize
   const endIndex = page * pageSize

   if (!search || search == "undefined") {
      await Service.findAll({ raw: true })
         .then(services => {
            const paginatedGalleries = services.slice(startIndex, endIndex)
            const totalPages = Math.ceil(services.length / pageSize)
            res.status(200).json({ services: paginatedGalleries, totalPages })

         })
   } else {
      await Service.findAll({
         where: {
            title: {
               [Op.like]: "%" + search + "%"
            },
         },
         raw: true
      })
         .then(services => {
            const paginatedGalleries = services.slice(startIndex, endIndex)
            const totalPages = Math.ceil(services.length / pageSize)
            res.status(200).json({ services: paginatedGalleries, totalPages })
         })

   }
}

 //Service status
 const statusService = async(req,res)=>{
   console.log(`staus id`,req.params.id)
   const id = req.params.id
   let serviceexists =  await Service.findOne({
      where: {
         id: id
      },
      raw: true
   })
   if (serviceexists.status === "1") {
      const queries = {
         status:"0"
      }
      await Service.update(queries, { where: { id: id } })
      .then(() => {
         res.status(200).json({ flag: 1, message: 'Blocked content successfully' })
      })
   }else if(serviceexists.status === "0"){
      const queries ={
         status:"1"
      }
      await Service.update(queries, { where: { id: id } })
      .then(() => {
         res.status(200).json({ flag: 1, message: 'Unblocked content successfully' })
      })
   }
}


//Service delete
const deleteService = async (req, res) => {
   console.log(`id `, req.params.id)
   const id = req.params.id
   await Service.destroy({
      where: { id: id }
   })
      .then(() => {
         res.status(200).json({ status: 1, message: 'Deleted content successfully' })
      }
      )
}


 //Service edit
 const editService = async (req, res) => {
   console.log('this is edit function')
   const id = req.params.id
   console.log(`editing ids`, req.params.id)
   await Service.findOne({
      where: {
         id: id
      },
      raw: true
   })
      .then(services => {
         res.status(200).json({ editservices: services })
      })
}

 //Service update
 const updateService = async(req, res) => {

     
   const id = req.body.id
   console.log(`service  id`,id)
   const services = {
      title: req.body.title,
      description:req.body.description,
      image: req.file.filename
   }
   await Service.update(services, { where: { id: id } })
      .then(() => {
         res.status(200).json({ status: 1, message: 'Updated service successfully' })
      })
}


module.exports={
createService,
showService,
statusService,
deleteService,
editService,
updateService,
}










   // Gallery create
   // const createGallery = async(req,res) => {
   
   //    console.log(req.body)
   //    console.log(req.file)
   //   const errors = validationResult(req)
   //   console.log('gallery error',errors)
       
   //   if (!errors.isEmpty() ) {
   //      res.status(420).json({ status: 0, errors: errors.array() })
     
   //   } else{
   //      let info = {
   //         title: req.body.title, 
   //         image: req.file.filename
   //      }
     
   //      const gallery = await Gallery.create(info)
   //         .then(data => {
   //            if (data) {
   //               res.status(200).json({ status: 1, message: `Added Content Successfully.` })
   //            }
   //         })
   //   }
   //   }


   //   const showGallery = async (req, res) => {
   //    const page = parseInt(req.query.page)
   //    const pageSize = parseInt(req.query.pageSize)
   //    const search = req.query.search
   //    const startIndex = (page - 1) * pageSize
   //    const endIndex = page * pageSize
   
   //    if (!search || search == "undefined") {
   //       await Gallery.findAll({ raw: true })
   //          .then(galleries => {
   //             const paginatedGalleries = galleries.slice(startIndex, endIndex)
   //             const totalPages = Math.ceil(galleries.length / pageSize)
   //             res.status(200).json({ galleries: paginatedGalleries, totalPages })
   
   //          })
   //    } else {
   //       await Gallery.findAll({
   //          where: {
   //             title: {
   //                [Op.like]: "%" + search + "%"
   //             },
   //          },
   //          raw: true
   //       })
   //          .then(galleries => {
   //             const paginatedGalleries = galleries.slice(startIndex, endIndex)
   //             const totalPages = Math.ceil(galleries.length / pageSize)
   //             res.status(200).json({ galleries: paginatedGalleries, totalPages })
   //          })
   
   //    }
   // }
   
   
   //Gallery status
   // const statusGallery = async(req,res)=>{
   //    console.log(`staus id`,req.params.id)
   //    const id = req.params.id
   //    let galleryexists =  await Gallery.findOne({
   //       where: {
   //          id: id
   //       },
   //       raw: true
   //    })
   //    if (galleryexists.status === "1") {
   //       const queries = {
   //          status:"0"
   //       }
   //       await Gallery.update(queries, { where: { id: id } })
   //       .then(() => {
   //          res.status(200).json({ flag: 1, message: 'Blocked content successfully' })
   //       })
   //    }else if(galleryexists.status === "0"){
   //       const queries ={
   //          status:"1"
   //       }
   //       await Gallery.update(queries, { where: { id: id } })
   //       .then(() => {
   //          res.status(200).json({ flag: 1, message: 'Unblocked content successfully' })
   //       })
   //    }
   // }
   
   //Gallery delete
   // const deleteGallery = async (req, res) => {
   //    console.log(`id `, req.params.id)
   //    const id = req.params.id
   //    await Gallery.destroy({
   //       where: { id: id }
   //    })
   //       .then(() => {
   //          res.status(200).json({ status: 1, message: 'Deleted content successfully' })
   //       }
   //       )
   // }
   
   
   //Gallery edit
   // const editGallery = async (req, res) => {
   //    console.log('this is edit function')
   //    const id = req.params.id
   //    console.log(`editing ids`, req.params.id)
   //    await Gallery.findOne({
   //       where: {
   //          id: id
   //       },
   //       raw: true
   //    })
   //       .then(galleries => {
   //          res.status(200).json({ editgalleries: galleries })
   //       })
   // }
   
   
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
   
