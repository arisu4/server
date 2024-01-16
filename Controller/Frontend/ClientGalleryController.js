const express = require('express')
const db = require('../../Model/IndexModel')


const Gallery = db.gallery

const show_gallery =(req,res,)=>{
   Gallery.findAll({raw:true})
   .then(results => {
   
    res.status(200).json(results)
})

}


module.exports = {
    show_gallery, 
}