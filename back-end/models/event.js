const sequelize = require('../config/db');


module.exports = (sequelize, DataTypes) => {
    return sequelize.define('event', {
        eventId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
    
        eventName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        eventTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        orgId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        checkedIsFeatured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    
        isFeatured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

    });
};

