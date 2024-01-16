const db = require('../../Model/IndexModel')
const query = require('../../Model/Query')
const { validationResult } = require('express-validator')
const { Op } = require('sequelize')


const Query = db.query


//Query add
const createFaq = async (req, res) => {
   const errors = validationResult(req)
   console.log(errors)
   if (!errors.isEmpty()) {
      res.status(420).json({ status: 0, errors: errors.array() })
   } else {
      let info = {
         questions: req.body.questions,
         solutions: req.body.solutions,
      }
      console.log(info)
      const queries = await Query.create(info)
         .then(data => {
            if (data) {
               res.status(200).json({ status: 1, message: `Added Faq Successfully` })
            }
         })
      // .catch((error) => {

      //    res.status(500).json({status: 0, message:`Something went wrong.`})
      // })
   }
}


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
const showQuery = async (req, res) => {
   const page = parseInt(req.query.page)
   const pageSize = parseInt(req.query.pageSize)
   const search = req.query.search
   const startIndex = (page - 1) * pageSize
   const endIndex = page * pageSize

   if (!search || search == "undefined") {
      await Query.findAll({ raw: true })
         .then(queries => {
            const paginatedQueries = queries.slice(startIndex, endIndex)
            const totalPages = Math.ceil(queries.length / pageSize)
            res.status(200).json({ queries: paginatedQueries, totalPages })

         })
   } else {
      await Query.findAll({
         where: {
            questions: {
               [Op.like]: "%" + search + "%"
            },
         },
         raw: true
      })
         .then(queries => {
            const paginatedQueries = queries.slice(startIndex, endIndex)
            const totalPages = Math.ceil(queries.length / pageSize)
            res.status(200).json({ queries: paginatedQueries, totalPages })
         })

   }
}


//Query status
const statusQuery = async(req,res)=>{
   console.log(`staus id`,req.params.id)
   const id = req.params.id
   let queryexists =  await Query.findOne({
      where: {
         id: id
      },
      raw: true
   })
   if (queryexists.status === "1") {
      const queries = {
         status:"0"
      }
      await Query.update(queries, { where: { id: id } })
      .then(() => {
         res.status(200).json({ flag: 1, message: 'Blocked FAQ successfully' })
      })
   }else if(queryexists.status === "0"){
      const queries ={
         status:"1"
      }
      await Query.update(queries, { where: { id: id } })
      .then(() => {
         res.status(200).json({ flag: 1, message: 'Unblocked FAQ successfully' })
      })
   }
}

//Query delete
const deleteQuery = async (req, res) => {
   console.log(`id `, req.params.id)
   const id = req.params.id
   await Query.destroy({
      where: { id: id }
   })
      .then(() => {
         res.status(200).json({ status: 1, message: 'Deleted FAQ successfully' })
      }
      )
}


//Query edit
const editQuery = async (req, res) => {
   console.log('this is edit function')
   const id = req.params.id
   console.log(`editing ids`, req.params.id)
   await Query.findOne({
      where: {
         id: id
      },
      raw: true
   })
      .then(queries => {
         res.status(200).json({ editqueries: queries })
      })
}


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


module.exports = {
   createFaq,
   showQuery,
   //searchQuery,
   statusQuery,
   deleteQuery,
   editQuery,
   updateQuery,
}
