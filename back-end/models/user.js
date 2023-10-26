const sequelize = require('../config/db');


module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        userId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
    
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        permissionLevel: 
        {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        }

    });
};

