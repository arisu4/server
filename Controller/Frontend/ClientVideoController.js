const express = require('express')
const db = require('../../Model/IndexModel')


const Video = db.video

const show_video =(req,res,)=>{
   Video.findOne({raw:true,
limit:1,
order:[['createdAt','desc']]})
   .then(results => {
   
    res.status(200).json(results)
})

}


module.exports = {
    show_video, 
}