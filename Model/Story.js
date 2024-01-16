module.exports = (sequelize,DataTypes) =>{
    const story = sequelize.define(`stories`,{
       
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        // image:{
        //     type:DataTypes.STRING,
        //     defaultValue: [],
        //     allowNull:false,
        //      get: function() {
        //         return json.parse(this.getdatavalue('image'));
        //     }, 
        //     set: function(val) {
        //         return this.setdatavalue('image', json.stringify(val));
        //     }
        // },
        image1:{
            type:DataTypes.STRING,
            allowNull:false
        },
        image2:{
            type:DataTypes.STRING,
            allowNull:false
        },
        image3:{
            type:DataTypes.STRING,
            allowNull:false
        },
        image4:{
            type:DataTypes.STRING,
            allowNull:false
        },
       
        createdAt: DataTypes.DATE, 
        updatedAt: DataTypes.DATE

    })

    return story
}