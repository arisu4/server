// const sequelize = require('../../utils')
 const contact_enquiry = require('../../Model/ContactEnquiry')
 const {validationResult} = require('express-validator')
// sequelize.sync()

// sequelize.sync({ force: true })


// const ContactCreate =(req,res)=>{
//     var name = req.body.name;
//     var email = req.body.email;
//     var mobile_number = req.body.mobile_number;
//     var subject = req.body.subject;
//     var message = req.body.message;

//     var sql = `INSERT INTO contacts (name, email,mobile_number, subject, message) VALUES ("${name}", "${email}", "${mobile_number}", "${subject}", "${message}  NOW())`;

//      db.query(sql, function(err, result) {
//         if (err) throw err;
//         console.log('record inserted');
//         req.flash('success', 'Data added successfully!');
//         res.redirect('/');
//       });

// }



// module.exports = {ContactCreate}

// const { check } = require("express-validator")
const db = require(`../../Model/IndexModel`)




// creating mainmodel

const ContactEnquiry = db.contact_enquiry


// create contact

// const addContact = async(req,res) =>{
//        console.log(`backeneddata`,req.body)
//     //    res.status(200).json({message:`good response`})
       
       
//     let info ={
//         name:req.body.name,
//         email:req.body.email,
//         mobile_number:req.body.mobile_number,
//         subject:req.body.subject,
//         message:req.body.message
//     }

//    //  if(!check)
//    //  {
//    //      res.status(200).json({status: 0, message:`Name is already taken`}) 
//    //  }
//    //   var error = []
//    //  if (!req.body.name) {
//    //      throw Error("Name is required");
//    //      error.push("")
//    //    }
//    //    if (!req.body.email) {
//    //      throw Error("Email is required");

//    //    }if (!req.body.mobile_number ) {
//    //      throw Error("Mobile Number is required");
//    //    }
//    //    if (req.body.mobile_number.length < 10) {
//    //      throw Error("Mobile number should have atleast 10 characters");
//    //    }
//    //    if (!req.body.subject) {
//    //      throw Error("Subject is required");
//    //    } 
//    //    if(!req.body.message){
//    //      throw Error("Message is required")
//    //    }
      
    

//     const contact = await ContactEnquiry.create(info)
//     .then(data=>{
//         if(data){
//         res.status(200).json({status: 1, message:`Your message has been send successfully`}) 
//         }
//         else{
//          res.status(200).json({status: 0, message:`Your message not sent.`})   
//         }
//        })
//         .catch((error) => {
//            res.status(500).json({status: 0, message:`Something went wrong.`})
//         })
     
//     }


    const addContact = async(req,res) =>{
      

        const errors = validationResult(req)

        if(!errors.isEmpty()){
           res.status(420).json({status: 0,errors:errors.array()}) 
        }else{
         let info ={
            name:req.body.name,
            email:req.body.email,
            mobile_number:req.body.mobile_number,
            subject:req.body.subject,
            message:req.body.message
        }
         const contact = await ContactEnquiry.create(info)
         .then((data,)=>{
   
           
            if(data){
            res.status(200).json({status: 1, message:`Your message has been send successfully`}) 
            }
            
           })
            // .catch((error) => {
              
            //    res.status(500).json({status: 0, message:`Something went wrong.`})
            // })
         
        }
   
       
   
     
     
    

    
     }
  

// const { body } = require('express-validator/check')


// const validate = (method) => {
// switch (method) {
//     case 'createContact': {
//      return [ 
//         body('name').optional({ checkFalsy: true }).isString() .withMessage(" Name should be string"),,
//         body('email', 'Invalid email').exists().isEmail(),
//         body('mobile_number','Please  provide your valid mobile number ').exists().isNumeric(),
//         body('subject','invalid subject').exists().isString(),
//         body('message','invalid message').exists().isString()
//        ]   
//     }
//   }
// }


// const validationHandler = next => result => {
//    if (result.isEmpty()) return
//    if (!next)
//      throw new Error(
//        result.array().map(i => `'${i.param}' has ${i.msg}`).join(' ')
//      )
//  else
//    return next(
//      new Error(
//       result.array().map(i => `'${i.param}' has ${i.msg}`).join('')
//      )
//    )
//  }
    

// let createContact = (req, res, next) => {
//    console.log(req.body)
//    req
//    .getValidationResult() // to get the result of above validate fn
//    .then(validationHandler())
//    .then(() => {
//       const { name, email, mobile_number,subject,message} = req.body
//       ContactEnquiry.create({
//         name,
//         email,
//         mobile_number,
//         subject,
//         message
//       })
//       .then(data=>{
//          if(data){
//          res.status(200).json({status: 1, message:`Your message has been send successfully`}) 
//          }
//          else{
//          res.status(200).json({status: 0, message:`Your message not sent.`})   
//           }
//       })
//    })
//    //  .catch(next)
// }
     



//module.exports = {addContact}

module.exports={addContact}