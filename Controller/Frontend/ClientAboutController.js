const express = require('express')
const db = require('../../Model/IndexModel')


const TeamMember = db.team_member
const Testimonial = db.testimonial
const Brand = db.brand

const show_team =(req,res,)=>{
   TeamMember.findAll({raw:true})
   .then(results => {
  
   
    res.status(200).json(results)
})

}

const show_testimonial =(req,res,)=>{
    Testimonial.findAll({raw:true})
    .then(results => {
   
     
     res.status(200).json(results)
 })
 
 }

 const show_brand =(req,res,)=>{
    Brand.findAll({raw:true})
    .then(results => {
   
     res.status(200).json(results)
 })
 
 }


module.exports = {
    show_team,
    show_testimonial,
    show_brand
}