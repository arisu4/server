module.exports = (sequelize,DataTypes) =>{
    const testimonial = sequelize.define(`testimonials`,{

        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        designation:{
            type:DataTypes.STRING,
            allowNull:false
        },
        message:{
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

    return testimonial
}