const { body } = require("express-validator");


const contactValidation = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage(" Name is required")
    .isString().matches('[a-z]' )
    .withMessage(" Name should be string"),
    body("email").optional().isEmail().withMessage("Provide valid email"),
    body("mobile_number")
      .optional()
      .isNumeric().matches('[0-9]' )
      .withMessage("phone number should be string")
      .custom((value) => {
        if (value.length !== 10) {
          return Promise.reject("Phone number should be 10 digits");
        } else {
          return true;
        }
      }),
    body("subject")
      // .optional()
      .isString().matches('[a-z] '|| '[A-Z]')
      .withMessage("subject should be string"),
    body("message")
      //.optional()
      .isString().matches('[a-z] || [A-Z]' )
      .withMessage("Message should be valid string")
    ]


    const testimonialValidation =[
      body("name")
      .not().isEmpty()
      .withMessage("Name is required")
      .isString().matches('[a-z]'|| '[A-Z]' )
      .withMessage("Name should be string"),
      body("designation")
      .not().isEmpty()
      .withMessage("Designation is required")
      .isString().matches('[a-z]'|| '[A-Z]' )
      .withMessage(" Designation should be string"),
      body("message")
      .not().isEmpty()
      .withMessage("Message is required")
      .isString().matches('[a-z]'|| '[A-Z]' )
      .withMessage("Message should be string"),
      ]


     const memberValidation = [
      body("name") 
      .isEmpty()
      .withMessage("Name is required")
      .isString().matches('[a-z]'|| '[A-Z]')
      .withMessage("Name should be string"),
      body("designation")
      .isEmpty()
      .withMessage(" Designation is required")
      .isString().matches('[a-z]')
      .withMessage(" Designation should be string"),
      body("image")
      .isEmpty()
      .withMessage("Image cannot be empty")
      .custom((value,{req})=>{
        if (!req.file) throw new Error(" Image is required");
        return true;
      }),
     ]


     const brandValidation =[
      body("image")
      .custom((value,{req})=>{
        if (!req.file) throw new Error(" Brand is required.");
        return true;
      })
     
     ]

  const videoValidation = [
    body("links")
    .exists()
    .withMessage("Video link is required.")
  ] 
  
  const serviceValidation = [
    body("title") 
    .isEmpty()
    .withMessage("Title is required")
    .isString().matches('[a-z]'|| '[A-Z]')
    .withMessage("Title should be string"),
    body("description")
    .isEmpty()
    .withMessage(" Description is required")
    .isString().matches('[a-z]'||'[A-Z]')
    .withMessage(" Description should be string"),
    body("image")
    .isEmpty()
    .withMessage("Image cannot be empty")
    .custom((value,{req})=>{
      if (!req.file) throw new Error(" Image is required");
      return true;
    }),
  ]

  const galleryValidation = [
    body("title")
    .isEmpty()
    .withMessage("Title is required.")
    .isString().matches('[a-z]'||'[A-Z]')
    .withMessage("Title should be string."),
    body("image")
    .isEmpty()
    .withMessage("Image is required.")
    .custom((value,{req})=>{
      if (!req.file) throw new Error(" Image is required");
      return true;
    })
  ]


  const queryValidation =[
    body("questions")
    .exists()
    .withMessage("Questions cannot be empty")
    .isString().matches('[a-z]' )
    .withMessage("Questions should be string."),
    body("solutions")
    .exists()
    .withMessage("Solutions cannot be empty")
    .isString().matches('[a-z]')
    .withMessage("Solutions should be string.")

  ]

  // function galleryValidation() {
  //   return [
  //     body("title")
  //   .exists()
  //   .withMessage("Title is required.")
  //   .isString().matches('[a-z]'|| '[A-Z]' )
  //   .withMessage("Title should be string."),
  //   body("image")
  //   .exists()
  //   .withMessage("Image is required.")
  
  //   ]
    
  // }



    
module.exports = {
  contactValidation,
  testimonialValidation,
  memberValidation,
  brandValidation,
  videoValidation,
  serviceValidation,
  galleryValidation,
  queryValidation
}