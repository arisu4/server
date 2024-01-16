module.exports = (sequelize,DataTypes) =>{
    const team_member = sequelize.define(`team_members`,{

     
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        designation:{
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
       
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE

    })

    return team_member
}