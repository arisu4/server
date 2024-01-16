const express = require('express')
const db = require('../../Model/IndexModel')


const Contact = db.contact

const show_contact =(req,res,)=>{
   Contact.findOne({raw:true,limit:1,order:[["createdAt","DESC"]]})
   .then(results => {
   
    res.status(200).json(results)
})

}

const show_link = (req,res)=>{
    Contact.findAll({raw:true})
    .then(results => {
    
     res.status(200).json(results)
 })  
}


module.exports = {
    show_contact,
    show_link 
}