const express = require('express')
const db = require('../../Model/IndexModel')


const Story = db.story

const show_story =(req,res,)=>{
   Story.findOne({raw:true,
    limit:1,
    order:[['createdAt','desc']]})
   .then(results => {
  
    res.status(200).json(results)
})

}


module.exports = {
    show_story
}