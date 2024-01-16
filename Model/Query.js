module.exports = (sequelize,DataTypes) =>{
    const question = sequelize.define(`queries`,{
        questions:{
            type:DataTypes.STRING,
            allowNull:false
        },
        solutions:{
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

    return question
}