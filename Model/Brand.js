module.exports = (sequelize,DataTypes) =>{
    const brand = sequelize.define(`brands`,{

       
        image:{
            type:DataTypes.STRING,
            allowNull:false
        },
        
       
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE

    })

    return brand
}