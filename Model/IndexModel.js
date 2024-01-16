const dbConfig = require(`../Config/dbConfig`)

const { Sequelize, DataTypes } = require(`sequelize`)

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,

        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log(`database connected`)
    })
    .catch(error => {
        console.log(`error occured during connection`, +error)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.contact_enquiry = require(`./ContactEnquiry`)(sequelize, DataTypes)
db.testimonial=require('./Testimonial')(sequelize, DataTypes)
db.team_member=require('./TeamMember')(sequelize, DataTypes)
db.brand = require('./Brand')(sequelize, DataTypes)
db.service = require('./Service')(sequelize, DataTypes)
db.contact = require('./Contact')(sequelize, DataTypes)
db.gallery = require('./Gallery')(sequelize, DataTypes)
db.query = require('./Query')(sequelize, DataTypes)
db.video = require('./Video')(sequelize, DataTypes)
db.story = require('./Story')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => {
        console.log(`yes resync of database done`)
    })

module.exports = db