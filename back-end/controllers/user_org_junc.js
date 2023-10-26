const UserOrgJuncDb = require('../models/index').UserOrgJunc;
const UserDb = require('../models/index').User;
const OrgDb = require('../models/index').Org;
const bcrypt = require('bcryptjs');
const controller = {
    createJunc : async function (req, res) {
        try {
            const junc = {
                userId: req.body.userId,
                orgId: req.body.orgId,
                typeOfJunc: req.body.typeOfJunc,
            };
            console.log(JSON.stringify(junc));

            let errors = [];

            if(errors.length === 0)
            {
                const checkUser = await UserDb.findOne({where: {
                    userId: junc.userId,
                }});
                const checkOrg = await OrgDb.findOne({where: {
                    orgId : junc.orgId,
                }});
                const checkJunc = await UserOrgJuncDb.findOne({where: {
                    userId: junc.userId,
                    orgId: junc.orgId,
                    typeOfJunc: junc.typeOfJunc,
                }});
                if(!checkUser || !checkOrg)
                {
                    throw new Error('Nu exista user sau organizatie');
                }
                else{
                    if(checkJunc)
                    {
                        res.status(400).send({message: "Junc already exists"});
                    }
                    else
                    {
                        newJunc = await UserOrgJuncDb.create({
                            userId: junc.userId,
                            orgId: junc.orgId,
                            typeOfJunc: junc.typeOfJunc,
                        })
                        res.status(200).send(newJunc);
                    }    
                }
            }
        }
        catch (err) {
            res.status(500).send(err.message);
            console.log(err.message);
            console.log('aici a crapat');   
        }
    },

    getJuncsByUserId: async function (req, res) {
        try{
            const id = req.params.id;
            console.log(id);
            const junc = await UserOrgJuncDb.findAll({where: {userId: id}})
            if(junc)
            {
                res.status(200).send(junc);
                console.log(JSON.stringify(junc));
            }
        }
        catch(err)
        {
            res.status(500).send("Server error!");
            console.log(err.message);
        }
    },
}

module.exports = controller;