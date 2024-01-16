module.exports = (sequelize,DataTypes) =>{
    const video = sequelize.define(`videos`,{

        links:{
            type:DataTypes.STRING,
            allowNull:false
        },
       
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE

    })

    return video
}