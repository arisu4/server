const db = require('../../Model/IndexModel')
const contact = require('../../Model/Contact')
const { validationResult } = require('express-validator')
const { Op } = require('sequelize')


const Contact = db.contact



//Contact add
//1
// const createContact = async (req, res) => {

//    const errors = validationResult(req)
//    console.log(errors)
   

//    if (!errors.isEmpty()) {
//       res.status(420).json({ status: 0, errors: errors.array() })
//    } else {
//       let info = {
//         mobile: req.body.mobile,
//          email: req.body.email,
//          address: req.body.address,
//          facebook_link:req.body.facebook_link,
//          twitter_link:req.body.twitter_link,
//          linkedin_link:req.body.linkedin_link,
//          instagram_link:req.body.instagram_link
//       }
//       console.log(info)
//       const contacts = await Contact.create(info)
//          .then(data => {
//             if (data) {
//                res.status(200).json({ status: 1, message: `Added Contacts Successfully` })
//             }
//          })
//       // .catch((error) => {

//       //    res.status(500).json({status: 0, message:`Something went wrong.`})
//       // })
//    }
// }

//2
const createContact = async (req, res) => {
   const errors = validationResult(req)
   console.log(errors)
   if (!errors.isEmpty()) {
      res.status(420).json({ status: 0, errors: errors.array() })
   } else {
      let info = {
         mobile: req.body.mobile,
         email: req.body.email,
         address: req.body.address,
         facebook_link:req.body.facebook_link,
         twitter_link:req.body.twitter_link,
         linkedin_link:req.body.linkedin_link,
         instagram_link:req.body.instagram_link
      }
      console.log(info)
      const contacts = await Contact.create(info)
         .then(data => {
            if (data) {
               res.status(200).json({ status: 1, message: `Added Contact Successfully` })
            }
         })
      // .catch((error) => {

      //    res.status(500).json({status: 0, message:`Something went wrong.`})
      // })
   }
}


//Contact fetch
//1
// const showContact = async(req,res) =>{
//    const page = parseInt(req.query.page)
//       const pageSize = parseInt(req.query.pageSize)
   
//      const startIndex = (page - 1) * pageSize
//      const endIndex = page * pageSize
   
//      const contacts = await Contact.findAll({raw:true})
//          .then(contacts => {
//              const paginatedContacts = contacts.slice(startIndex, endIndex)
//              const totalPages = Math.ceil(contacts.length/ pageSize)
           
//              res.status(200).json({ contacts: paginatedContacts, totalPages })
//          })
// }


const showContact = async(req, res) => {
   const page = parseInt(req.query.page)
   const pageSize = parseInt(req.query.pageSize)
   const search = req.query.search
   const startIndex = (page - 1) * pageSize
   const endIndex = page * pageSize

   if (!search || search == "undefined") {
      await Contact.findAll({ raw: true })
         .then(contacts => {
            const paginatedContacts = contacts.slice(startIndex, endIndex)
            const totalPages = Math.ceil(contacts.length / pageSize)
            res.status(200).json({ contacts: paginatedContacts, totalPages })

         })
   } else {
      await Contact.findAll({
         where: {
            email: {
               [Op.like]: "%" + search + "%"
            },
         },
         raw: true
      })
         .then(contacts => {
            const paginatedContacts = contacts.slice(startIndex, endIndex)
            const totalPages = Math.ceil(contacts.length / pageSize)
            res.status(200).json({ contacts: paginatedContacts, totalPages })
         })

   }
}



//Contact status
const statusContact = async(req,res)=>{
   console.log(`staus id`,req.params.id)
   const id = req.params.id
   let contactexists =  await Contact.findOne({
      where: {
         id: id
      },
      raw: true
   })
   if (contactexists.status === "1") {
      const contacts = {
         status:"0"
      }
      await Contact.update(contacts, { where: { id: id } })
      .then(() => {
         res.status(200).json({ flag: 1, message: 'Blocked Contact successfully' })
      })
   }else if(contactexists.status === "0"){
      const contacts ={
         status:"1"
      }
      await Contact.update(contacts, { where: { id: id } })
      .then(() => {
         res.status(200).json({ flag: 1, message: 'Unblocked contact successfully' })
      })
   }
}

//Contact delete
const deleteContact=async(req,res)=>{
   console.log(`id `, req.params.id)
   const id = req.params.id
   await Contact.destroy({
      where: { id: id }
   })
      .then(() => {
         res.status(200).json({ status: 1, message: 'Deleted Contact successfully' })
      }
      )
}

//Contact edit
const editContact =async(req,res)=>{
   console.log('this is edit function')
   const id = req.params.id
   console.log(`editing ids`, req.params.id)
   await Contact.findOne({
      where: {
         id: id
      },
      raw: true
   })
      .then(contacts => {
         res.status(200).json({ editcontacts: contacts })
      })
}

//Contact update
const updateContact=async(req,res)=>{
   const id = req.body.id
   const contacts = {
      mobile: req.body.mobile,
      email: req.body.email,
      address: req.body.address,
      facebook_link:req.body.facebook_link,
      twitter_link:req.body.twitter_link,
      linkedin_link:req.body.linkedin_link,
      instagram_link:req.body.instagram_link
   }
   await Contact.update(contacts, { where: { id: id } })
      .then(() => {
         res.status(200).json({ status: 1, message: 'Updated Contact successfully' })
      })
}  




module.exports = {
   createContact,
   showContact,
   statusContact,
   deleteContact,
   editContact,
   updateContact,
}









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
const updateQuery = async (req, res) => {
   const id = req.body.id
   const queries = {
      questions: req.body.questions,
      solutions: req.body.solutions
   }
   await Query.update(queries, { where: { id: id } })
      .then(() => {
         res.status(200).json({ status: 1, message: 'Updated FAQ successfully' })
      })
}

