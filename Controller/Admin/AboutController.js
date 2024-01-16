const db = require('../../Model/IndexModel')
const testimonial = require('../../Model/Testimonial')
const team_member = require('../../Model/TeamMember')
const brand = require('../../Model/Brand')
const story = require('../../Model/Story')
const  {validationResult}  = require('express-validator')
const path = require('path')
const { Op } = require('sequelize')


const Testimonial = db.testimonial
const TeamMember = db.team_member
const Brand = db.brand
const Video = db.video
const Story = db.story


//Testimonial add
// const createTestimonials = async (req, res) => {

//    const errors = validationResult(req)
//    console.log(errors)
   

//    if (!errors.isEmpty()) {
//       res.status(420).json({ status: 0, errors: errors.array() })
//    } else {
//       let info = {
//          name: req.body.name,
//          designation: req.body.designation,
//          message: req.body.message
//       }
//       console.log(info)
//       const testimonials = await Testimonial.create(info)
//          .then(data => {
//             if (data) {
//                res.status(200).json({ status: 1, message: `Added Testimonial Successfully` })
//             }
//          })
//       // .catch((error) => {

//       //    res.status(500).json({status: 0, message:`Something went wrong.`})
//       // })
//    }
// }


//1.
// const createTestimonials = async (req, res) => {

//    const errors = validationResult(req)
//    console.log(errors)
   

//    if (!errors.isEmpty()) {
//       res.status(420).json({ status: 0, errors: errors.array() })
//    } else {
//       let info = {
//          name: req.body.name,
//          designation: req.body.designation,
//          message: req.body.message
//       }
//       console.log(info)
//       const testimonials = await Testimonial.create(info)
//          .then(data => {
//             if (data) {
//                res.status(200).json({ status: 1, message: `Added Testimonial Successfully` })
//             }
//          })
//       // .catch((error) => {

//       //    res.status(500).json({status: 0, message:`Something went wrong.`})
//       // })
//    }
// }

//2.
const createTestimonials = async (req, res) => {
   const errors = validationResult(req)
   console.log(errors)
   if (!errors.isEmpty()) {
      res.status(420).json({ status: 0, errors: errors.array() })
   } else {
      let info = {
         name: req.body.name,
         designation: req.body.designation,
         message: req.body.message
      }
      console.log(info)
      const testimonial = await Testimonial.create(info)
         .then(data => {
            if (data) {
               res.status(200).json({ status: 1, message: `Added Testimonial Successfully` })
            }
         })
      // .catch((error) => {

      //    res.status(500).json({status: 0, message:`Something went wrong.`})
      // })
   }
}







//1.
// const showTestimonials = async(req, res) => {

//     const page = parseInt(req.query.page)
//     const pageSize = parseInt(req.query.pageSize)

//    const startIndex = (page - 1) * pageSize
//    const endIndex = page * pageSize

//    const testimonials = await Testimonial.findAll({raw:true})
//        .then(testimonials => {
//            const paginatedTestimonials = testimonials.slice(startIndex, endIndex)
//            const totalPages = Math.ceil(testimonials.length/ pageSize)
//            console.log(`paginated testimonials`, paginatedTestimonials)
//            console.log(`total pages`, totalPages)
//            res.status(200).json({ testimonials: paginatedTestimonials, totalPages })
//        })
// }

const showTestimonials = async (req, res) => {
   const page = parseInt(req.query.page)
   const pageSize = parseInt(req.query.pageSize)
   const search = req.query.search
   const startIndex = (page - 1) * pageSize
   const endIndex = page * pageSize

   if (!search || search == "undefined") {
      await Testimonial.findAll({ raw: true })
         .then(testimonials => {
            const paginatedTestimonials = testimonials.slice(startIndex, endIndex)
            const totalPages = Math.ceil(testimonials.length / pageSize)
            res.status(200).json({ testimonials: paginatedTestimonials, totalPages })

         })
   } else {
      await Testimonial.findAll({
         where: {
            name: {
               [Op.like]: "%" + search + "%"
            },
         },
         raw: true
      })
         .then(testimonials => {
            const paginatedTestimonials = testimonials.slice(startIndex, endIndex)
            const totalPages = Math.ceil(testimonials.length / pageSize)
            res.status(200).json({ testimonials: paginatedTestimonials, totalPages })
         })

   }
}

//Testimonial status
const statusTestimonial = async(req,res)=>{
   console.log(`staus id`,req.params.id)
   const id = req.params.id
   let testimonialexists =  await Testimonial.findOne({
      where: {
         id: id
      },
      raw: true
   })
   if (testimonialexists.status === "1") {
      const testimonials = {
         status:"0"
      }
      await Testimonial.update(testimonials, { where: { id: id } })
      .then(() => {
         res.status(200).json({ flag: 1, message: 'Blocked Testimonial successfully' })
      })
   }else if(testimonialexists.status === "0"){
      const testimonials ={
         status:"1"
      }
      await Testimonial.update(testimonials, { where: { id: id } })
      .then(() => {
         res.status(200).json({ flag: 1, message: 'Unblocked Testimonial successfully' })
      })
   }
}

//Testimonial delete
const deleteTestimonial = async (req, res) => {
   console.log(`id `, req.params.id)
   const id = req.params.id
   await Testimonial.destroy({
      where: { id: id }
   })
      .then(() => {
         res.status(200).json({ status: 1, message: 'Deleted Testimonial successfully' })
      }
      )
}

//Testimonial edit
const editTestimonial = async (req, res) => {
   console.log('this is edit function')
   const id = req.params.id
   console.log(`editing ids`, req.params.id)
   await Testimonial.findOne({
      where: {
         id: id
      },
      raw: true
   })
      .then(testimonials => {
         res.status(200).json({ edittestimonials: testimonials })
      })
}

//Testimonial update
const updateTestimonial = async (req, res) => {
   const id = req.body.id
   const testimonials = {
      name: req.body.name,
      designation: req.body.designation,
      message: req.body.message
   }
   await Testimonial.update(testimonials, { where: { id: id } })
      .then(() => {
         res.status(200).json({ status: 1, message: 'Updated Testimonial successfully' })
      })
}




//Team member add
// const createMembers = async(req, res) => {
// const errors = validationResult(req)
// console.log('member error',errors)
  
// if (!errors.isEmpty()) {
//    res.json({ status: 0, errors: errors.array() })
// } else if(!req.file){
//  res.json({message:"Please select an image"})
// }else{
//    let info = {
//       name: req.body.name,
//       designation: req.body.designation,
//       image: req.file.filename
//    }

//    const teammember = await TeamMember.create(info)
//       .then(data => {
//          if (data) {
//             res.status(200).json({ status: 1, message: `Added Members Successfully` })
//          }
//       })
// }
// }

//Team add
//1
// const createMembers = async(req,res) => {
   
//     console.log(req.body)
//     console.log(req.file)
//    const errors = validationResult(req)
//    console.log('member error',errors)
     
//    if (!errors.isEmpty() ) {
//       res.status(420).json({ status: 0, errors: errors.array() })
   
//    } else{
//       let info = {
//          name: req.body.name,
//          designation: req.body.designation,
//          image: req.file.filename
//       }
   
//       const teammember = await TeamMember.create(info)
//          .then(data => {
//             if (data) {
//                res.status(200).json({ status: 1, message: `Added Members Successfully` })
//             }
//          })
//    }
//    }



//2
const createMembers = async(req,res) => {
   
   console.log(req.body)
   console.log(req.file)
  const errors = validationResult(req)
  console.log('member error',errors)
    
  if (!errors.isEmpty() ) {
     res.status(420).json({ status: 0, errors: errors.array() })
  
  } else{
     let info = {
        name: req.body.name, 
        designation: req.body.designation,
        image: req.file.filename
     }
  
     const teammember = await TeamMember.create(info)
        .then(data => {
           if (data) {
              res.status(200).json({ status: 1, message: `Added Members Successfully.` })
           }
        })
  }
  }

// Team fetch
//1
//    const showMembers = async(req,res)=>{
//       const page = parseInt(req.query.page)
//    const pageSize = parseInt(req.query.pageSize)

//   const startIndex = (page - 1) * pageSize
//   const endIndex = page * pageSize

//   const members = await TeamMember.findAll({raw:true})
//       .then(teams => {
//           const paginatedMembers = teams.slice(startIndex, endIndex)
//           const totalPages = Math.ceil(teams.length/ pageSize)
        
//           res.status(200).json({ teams: paginatedMembers, totalPages })
//       })
//       }
      
//2
const showMembers = async (req, res) => {
   const page = parseInt(req.query.page)
   const pageSize = parseInt(req.query.pageSize)
   const search = req.query.search
   const startIndex = (page - 1) * pageSize
   const endIndex = page * pageSize

   if (!search || search == "undefined") {
      await TeamMember.findAll({ raw: true })
         .then(teams => {
            const paginatedMembers = teams.slice(startIndex, endIndex)
            const totalPages = Math.ceil(teams.length / pageSize)
            res.status(200).json({ teams: paginatedMembers, totalPages })

         })
   } else {
      await TeamMember.findAll({
         where: {
            name: {
               [Op.like]: "%" + search + "%"
            },
         },
         raw: true
      })
         .then(teams => {
            const paginatedMembers = teams.slice(startIndex, endIndex)
            const totalPages = Math.ceil(teams.length / pageSize)
            res.status(200).json({ teams: paginatedMembers, totalPages })
         })

   }
}

//Team status
const statusMember =async(req,res)=>{
   console.log(`staus id`,req.params.id)
   const id = req.params.id
   let memberexists =  await TeamMember.findOne({
      where: {
         id: id
      },
      raw: true
   })
   if (memberexists.status === "1") {
      const members = {
         status:"0"
      }
      await TeamMember.update(members, { where: { id: id } })
      .then(() => {
         res.status(200).json({ flag: 1, message: 'Blocked Member successfully' })
      })
   }else if(memberexists.status === "0"){
      const members ={
         status:"1"
      }
      await TeamMember.update(members, { where: { id: id } })
      .then(() => {
         res.status(200).json({ flag: 1, message: 'Unblocked Member successfully' })
      })
   }
}

//Team delete
const deleteMember = async(req,res)=>{
   console.log(`id `, req.params.id)
   const id = req.params.id
   await TeamMember.destroy({
      where: { id: id }
   })
      .then(() => {
         res.status(200).json({ status: 1, message: 'Deleted Member successfully' })
      }
      )
}

//Team edit
const editMember = async(req,res)=>{
   console.log('this is edit function')
   const id = req.params.id
   console.log(`editing ids`, req.params.id)
   await TeamMember.findOne({
      where: {
         id: id
      },
      raw: true
   })
      .then(teams => {
         res.status(200).json({ editteams: teams })
      })
}

//Team update
const updateMember = async(req,res)=>{
   const id = req.body.id
      console.log(`gallery  id`,id)
      const teams = {
         name: req.body.name, 
         designation: req.body.designation,
         image: req.file.filename 
      }
      await TeamMember.update(teams, { where: { id: id } })
         .then(() => {
            res.status(200).json({ status: 1, message: 'Updated Member successfully' })
         })
}





//Brand add
// const createBrands = async (req, res) => {
   
//  if(!req.file){
//    res.json({message:`Please choose an image of type jpg, jpeg, png or webp.` })
   
//  }else{
//    let info = {
//       image: req.file.filename
//    }
//    const brands = await Brand.create(info)

//          .then((data) => {

//             if (data) {
//                res.status(200).json({ status: 1, message: `Added Brands Successfully` })
//             }

//          })
//  }
//        }

// Brands add
      
       const createBrands = async (req,res) => {

         const errors = validationResult(req)
         console.log(errors)

         if (!errors.isEmpty()) {
            res.status(420).json({ status: 0, errors: errors.array() })
         } else {
            let info = {
               image: req.file.filename,  
            }
            console.log(info)
            const brands = await Brand.create(info)
               .then(data => {
                  if (data) {
                     res.status(200).json({ status: 1, message: `Added Brands Successfully` })
                  }
               })
               }
            }


// Brands show
const showBrands = async(req,res)=>{
   const page = parseInt(req.query.page)
   const pageSize = parseInt(req.query.pageSize)

  const startIndex = (page - 1) * pageSize
  const endIndex = page * pageSize

  const brands = await Brand.findAll({raw:true})
      .then(brands => {
          const paginatedBrands = brands.slice(startIndex, endIndex)
          const totalPages = Math.ceil(brands.length/ pageSize)
        
          res.status(200).json({ brands: paginatedBrands, totalPages })
      })
}


//Brands Delete
const deleteBrand = async(req,res)=>{
   console.log(`id `, req.params.id)
   const id = req.params.id
   await Brand.destroy({
      where: { id: id }
   })
      .then(() => {
         res.status(200).json({ status: 1, message: 'Deleted Brand successfully' })
      }
      )
}









//Video add

// const createVideos = async(req,res)=>{
//    console.log(req.body)
   
  
//    if(!req.body){
//       res.status(400).json({ status: 0, message: `Please enter link.` })
      
//     }
//     else{
//       let info = {
//          links: req.body.links
//       }
//       const videos = await Video.create(info)

//             .then((data) => {
//                if (data) {
//                   res.status(200).json({ status: 1, message: `Added Videos Successfully` })
// }
// })
//     }
//  }

 const createVideos = async(req,res)=>{
   console.log("video",req)

   const errors = validationResult(req)
   console.log(errors)
   

   if (!errors.isEmpty()) {
      res.status(420).json({ status: 0, errors: errors.array() })
   } else {
      let info = {
         links: req.body.links,
      }
      console.log(info)
      const videos = await Video.create(info)
         .then(data => {
            if (data) {
               res.status(200).json({ status: 1, message: `Added Videos Successfully` })
            }
         })
      // .catch((error) => {

      //    res.status(500).json({status: 0, message:`Something went wrong.`})
      // })
   }
   
   
  
//    if(!req.body){
//       res.status(400).json({ status: 0, message: `Please enter link.` })
      
//     }
//     else{
//       let info = {
//          links: req.body.links
//       }
//       const videos = await Video.create(info)

//             .then((data) => {
//                if (data) {
//                   res.status(200).json({ status: 1, message: `Added Videos Successfully` })
// }
// })
//     }
 }


 // Video fetching

//  const videos= await Video.findAll({raw:true})
//  .then(videos=>{
//     res.status(200).json(videos)
//  })

const showVideos =async(req,res)=>{
   const page = parseInt(req.query.page)
   const pageSize = parseInt(req.query.pageSize)

  const startIndex = (page - 1) * pageSize
  const endIndex = page * pageSize

  const videos = await Video.findAll({raw:true})
      .then(videos => {
          const paginatedVideos = videos.slice(startIndex, endIndex)
          const totalPages = Math.ceil(videos.length/ pageSize)
        
          res.status(200).json({ videos: paginatedVideos, totalPages })
      })
}

//Video delete
const deleteVideo = async(req,res)=>{
   console.log(`id `, req.params.id)
   const id = req.params.id
   await Video.destroy({
      where: { id: id }
   })
      .then(() => {
         res.status(200).json({ status: 1, message: 'Deleted Video successfully' })
      }
      )
}






// Story add
 const createStory =(req,res)=>{
   console.log("body story",req.body)
   console.log("files",req.files)
   console.log("body description",req.body.description)
   // console.log("image1",req.files[0].filename)
   //    console.log("image2",req.files[1].filename)
   //    console.log("image3",req.files[2].filename)
   //    console.log("image4",req.files[3].filename)
   const storyimages = req.files
   console.log(`story images` ,storyimages)

 if(!req.files){
      res.json({message:`Please in story choose an image of type jpg, jpeg, png or webp.` })

    }else {
     

      let info ={
      
         description: req.body.description,
         image1:req.files[0].filename,
         image2:req.files[1].filename,
         image3:req.files[2].filename,
         image4:req.files[3].filename,
      }
 
      const story =  Story.create(info)
      .then(data => {
         if (data) {
            res.status(200).json({ status: 1, message: `Added Members Successfully` })
         }
      })
   
    }
    
   }

   // Story fetch

   const showStory = async(req,res)=>{
      const page = parseInt(req.query.page)
      const pageSize = parseInt(req.query.pageSize)
   
     const startIndex = (page - 1) * pageSize
     const endIndex = page * pageSize
   
     const stories = await Story.findAll({raw:true})
         .then(stories => {
             const paginatedStories = stories.slice(startIndex, endIndex)
             const totalPages = Math.ceil(stories.length/ pageSize)
           
             res.status(200).json({ stories: paginatedStories, totalPages })
         })
   }




module.exports = {
   
   createTestimonials,
   showTestimonials,
   statusTestimonial,
   deleteTestimonial,
   editTestimonial,
   updateTestimonial,

   createMembers,
   showMembers,
   statusMember,
   deleteMember,
   editMember,
   updateMember,

   createBrands,
   showBrands,
   deleteBrand,

   createVideos,
   showVideos,
   deleteVideo,

   createStory,
   showStory,
   
}











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
   // const updateGallery = async(req, res) => {

     
   //    const id = req.body.id
   //    console.log(`gallery  id`,id)
   //    const galleries = {
   //       title: req.body.title,
   //       image: req.file.filename
   //    }
   //    await Gallery.update(galleries, { where: { id: id } })
   //       .then(() => {
   //          res.status(200).json({ status: 1, message: 'Updated gallery successfully' })
   //       })
   // }
   






   
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











//Query add
// const createFaq = async (req, res) => {
//    const errors = validationResult(req)
//    console.log(errors)
//    if (!errors.isEmpty()) {
//       res.status(420).json({ status: 0, errors: errors.array() })
//    } else {
//       let info = {
//          questions: req.body.questions,
//          solutions: req.body.solutions,
//       }
//       console.log(info)
//       const queries = await Query.create(info)
//          .then(data => {
//             if (data) {
//                res.status(200).json({ status: 1, message: `Added Faq Successfully` })
//             }
//          })
//       // .catch((error) => {

//       //    res.status(500).json({status: 0, message:`Something went wrong.`})
//       // })
//    }
// }


//Query search
// const searchQuery = async (req, res) => {
//    const searchText = req.query.search
//    console.log(`see`,searchText)
//    await Query.findAll({
//       where: {
//          questions: {
//             [Op.like]: "%" + searchText + "%"
//          },
//       },
//       raw: true
//    }
//    )
//       .then(data => {
//          console.log(`searchresult`, data)
//          res.status(200).json({ result: data })
//       })
// }



//Query show
// const showQuery = async (req, res) => {
//    const page = parseInt(req.query.page)
//    const pageSize = parseInt(req.query.pageSize)
//    const search = req.query.search
//    const startIndex = (page - 1) * pageSize
//    const endIndex = page * pageSize

//    if (!search || search == "undefined") {
//       await Query.findAll({ raw: true })
//          .then(queries => {
//             const paginatedQueries = queries.slice(startIndex, endIndex)
//             const totalPages = Math.ceil(queries.length / pageSize)
//             res.status(200).json({ queries: paginatedQueries, totalPages })

//          })
//    } else {
//       await Query.findAll({
//          where: {
//             questions: {
//                [Op.like]: "%" + search + "%"
//             },
//          },
//          raw: true
//       })
//          .then(queries => {
//             const paginatedQueries = queries.slice(startIndex, endIndex)
//             const totalPages = Math.ceil(queries.length / pageSize)
//             res.status(200).json({ queries: paginatedQueries, totalPages })
//          })

//    }
// }


//Query status
// const statusQuery = async(req,res)=>{
//    console.log(`staus id`,req.params.id)
//    const id = req.params.id
//    let queryexists =  await Query.findOne({
//       where: {
//          id: id
//       },
//       raw: true
//    })
//    if (queryexists.status === "1") {
//       const queries = {
//          status:"0"
//       }
//       await Query.update(queries, { where: { id: id } })
//       .then(() => {
//          res.status(200).json({ flag: 1, message: 'Blocked FAQ successfully' })
//       })
//    }else if(queryexists.status === "0"){
//       const queries ={
//          status:"1"
//       }
//       await Query.update(queries, { where: { id: id } })
//       .then(() => {
//          res.status(200).json({ flag: 1, message: 'Unblocked FAQ successfully' })
//       })
//    }
// }

//Query delete
// const deleteQuery = async (req, res) => {
//    console.log(`id `, req.params.id)
//    const id = req.params.id
//    await Query.destroy({
//       where: { id: id }
//    })
//       .then(() => {
//          res.status(200).json({ status: 1, message: 'Deleted FAQ successfully' })
//       }
//       )
// }


//Query edit
// const editQuery = async (req, res) => {
//    console.log('this is edit function')
//    const id = req.params.id
//    console.log(`editing ids`, req.params.id)
//    await Query.findOne({
//       where: {
//          id: id
//       },
//       raw: true
//    })
//       .then(queries => {
//          res.status(200).json({ editqueries: queries })
//       })
// }


//Query update
// const updateQuery = async (req, res) => {
//    const id = req.body.id
//    const queries = {
//       questions: req.body.questions,
//       solutions: req.body.solutions
//    }
//    await Query.update(queries, { where: { id: id } })
//       .then(() => {
//          res.status(200).json({ status: 1, message: 'Updated FAQ successfully' })
//       })
// }
