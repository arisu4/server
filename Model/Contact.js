module.exports = (sequelize,DataTypes) =>{
    const contact = sequelize.define(`contacts`,{
        mobile:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        facebook_link:{
            type:DataTypes.STRING,
            allowNull:false   
        },
        twitter_link:{
            type:DataTypes.STRING,
            allowNull:false   
        },
        linkedin_link:{
            type:DataTypes.STRING,
            allowNull:false   
        },
        instagram_link:{
            type:DataTypes.STRING,
            allowNull:false   
        },
        status:{
            type:DataTypes.STRING,
            defaultValue: "1",
            allowNull:false
           
        },
       
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE

    })

    return contact
}