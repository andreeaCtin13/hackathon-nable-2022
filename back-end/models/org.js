const sequelize = require('../config/db');


module.exports = (sequelize, DataTypes) => {
    return sequelize.define('org', {
        orgId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
    
        orgName: {
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
    
        orgPhone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        orgCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        bankAccount: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        //aici trebuie uploadat certif si verificat
        isCertified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        
        permissionLevel: 
        {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        }
    });
};

