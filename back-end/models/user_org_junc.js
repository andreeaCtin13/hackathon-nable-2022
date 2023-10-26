const sequelize = require('../config/db');


module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_org_junc', {
        juncId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
    
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: false,
            references: {
                model: 'user',
                key: 'userId',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
    
        orgId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'org',
                key: 'orgId',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        
        typeOfJunc: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
};

