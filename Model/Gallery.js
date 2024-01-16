module.exports = (sequelize,DataTypes) =>{
    const gallery = sequelize.define(`galleries`,{
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        image:{
            type:DataTypes.STRING,
            allowNull:false
        },
        
        status:{
            type:DataTypes.STRING,
            defaultValue: "1",
            allowNull:false
           
        },
       
        createdAt:DataTypes.DATE,
        updatedAt: DataTypes.DATE

    })

    return gallery
}