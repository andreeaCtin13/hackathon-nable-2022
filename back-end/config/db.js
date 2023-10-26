const Sequelize = require('sequelize');

const sequelize = new Sequelize('hackathon_db', 'root', '', {
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
    },
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;