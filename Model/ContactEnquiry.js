// const Sequelize = require('sequelize') 



  
// // Import sequelize object,  
// // Database connection pool managed by Sequelize. 
 //const sequelize = require('../utils') 
  
// // Define method takes two arguments 
// // 1st - name of table 
// // 2nd - columns inside the table 
// const contact_enquiry = sequelize.define('contact_enquiry', { 
  
//     // Column-1, user_id is an object with  
//     // properties like type, keys,  
//     // validation of column. 
//     id:{ 
  
//         // Sequelize module has INTEGER Data_Type. 
//         type:Sequelize.INTEGER, 
  
//         // To increment user_id automatically. 
//         autoIncrement:true, 
  
//         // user_id can not be null. 
//         allowNull:false, 
  
//         // For uniquely identify user. 
//         primaryKey:true
//     }, 
  
//     // Column-2, name 
//     name: { type: Sequelize.STRING, allowNull:false }, 
  
//     // Column-3, email 
//     email: { type: Sequelize.STRING, allowNull:false }, 
  
//     // Column-4, default values for 
//     // dates => current time 

    
//     mobile_number: { type: Sequelize.INTEGER, allowNull:false},  
             

//     subject: { type: Sequelize.STRING, allowNull:false }, 


//     message:{type: Sequelize.STRING, allowNull:false},


        
  
//      // Timestamps 
//      createdAt: Sequelize.DATE, 
//      updatedAt: Sequelize.DATE, 
// }) 
  
// // Exporting User, using this constant 
// // we can perform CRUD operations on 
// // 'user' table. 
// module.exports =  contact_enquiry


module.exports = (sequelize,DataTypes) =>{
    const contact_enquiry = sequelize.define(`contact_enquiries`,{

        // id:{       
        //             type:DataTypes.INTEGER, 
              
               
        //             autoIncrement:true, 
              
            
        //             allowNull:false, 
              
             
        //             primaryKey:true
        //         }, 
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        mobile_number:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        subject:{
            type:DataTypes.STRING,
            allowNull:false
        },
        message:{
            type:DataTypes.STRING,
            allowNull:false
        },
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE

    })

    return contact_enquiry
}