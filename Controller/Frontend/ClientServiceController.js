const express = require('express')
const db = require('../../Model/IndexModel')


const Service = db.service

const show_service =(req,res,)=>{
   Service.findAll({raw:true})
   .then(results => {
   
    res.status(200).json(results)
})

}


module.exports = {
    show_service, 
}