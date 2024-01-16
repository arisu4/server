const express = require('express')
const db = require('../../Model/IndexModel')


const Query = db.query

const show_query =(req,res,)=>{
    Query.findAll({raw:true})
    .then(results => {
   
    
     res.status(200).json(results)
 })
}


module.exports = {
    show_query, 
}