const sequelize = require('../config/db');


module.exports = (sequelize, DataTypes) => {
    return sequelize.define('event_Type', {
        eventTypeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
    
        eventTypeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

