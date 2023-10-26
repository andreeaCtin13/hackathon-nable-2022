const db = require('../config/db');
const Sequelize = require('sequelize');


const UserModel = require('./user');
const User = UserModel(db, Sequelize)

const OrgModel = require('./org');
const Org = OrgModel(db, Sequelize);


const EventModel = require('./event');
const Event = EventModel(db, Sequelize);

const EventTypeModel = require('./event_types');
const EventType = EventTypeModel(db, Sequelize);

const UserOrgJuncModel = require('./user_org_junc');
const UserOrgJunc = UserOrgJuncModel(db, Sequelize);


UserOrgJunc.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'userId',
    as: 'user',
    unique: false,
});
UserOrgJunc.belongsTo(Org, {
    foreignKey: 'orgId',
    targetKey: 'orgId',
    as: 'org',
    unique: false,
});

User.belongsToMany(Org, {
    as: 'OrgInUser',
    through: UserOrgJunc,
    foreignKey: 'userId',
    unique: false,
});

Org.belongsToMany(User, {
    as: 'UserInOrg',
    through: UserOrgJunc,
    foreignKey: 'orgId',
    unique: false,
});

Org.hasMany(Event, {
    as: "Events"
});
Event.belongsTo(Org, {
    foreignKey: 'orgId',
    as: 'org',
});


module.exports = {
    User,
    Org,
    Event,
    EventType,
    UserOrgJunc,
    connection: db,
}