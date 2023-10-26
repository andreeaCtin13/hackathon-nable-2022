const OrgDb = require('../models/index').Org;
const bcrypt = require('bcryptjs');
const AuthController = require('./auth');
const controller = {
    createOrg : async function (req, res) {
        try {
            const org = {
                orgName: req.body.orgName,
                email: req.body.email,
                password: req.body.password,
                orgPhone: req.body.orgPhone,
                orgCity: req.body.orgCity,
                bankAccount: req.body.bankAccount,
            };

            console.log(JSON.stringify(org));
            let errors = [];

            if(!org.orgName || !org.email || !org.password || !org.orgPhone || !org.orgCity || !org.bankAccount)
            {
                errors.push("Unul sau mai multe campuri nu au fost completate");
                console.log("Unul sau mai multe campuri nu au fost completate")
            }
            else 
            {
                if(org.orgName.length < 2 || org.orgName.length > 30)
                {
                    errors.push("Numele trebuie sa contina mai mult de 2 litere si mai putin de 30")
                    console.log("Numele trebuie sa contina mai mult de 2 litere si mai putin de 30")
                }
                else if(!org.orgName.match('^[a-zA-ZÀ-žșȘțȚăĂîÎâÂ-]+$'))
                {
                    errors.push("Numele trebuie sa contina doar litere");
                    console.log("Numele trebuie sa contina doar litere");
                }
                //TODO alte validari
            }
            console.log("am ajuns aici")

            if(errors.length === 0)
            {
                console.log("nu au aparut erori");
                const encryptedPassword = await bcrypt.hash(org.password, 10);
                const newOrg = await OrgDb.create({
                    orgName: org.orgName,
                    email: org.email.toLowerCase(),
                    password: encryptedPassword,
                    orgPhone: org.orgPhone,
                    orgCity: org.orgCity,
                    bankAccount: org.bankAccount,
                })

                res.status(200).send(newOrg);
            }
        }
        catch (err) {
            res.status(500).send(err.message);
            console.log(err.message);
        }
    },

    geOrgById: async function (req, res) {
        try{
            const id = req.params.id;
            console.log(id);
            const org = await OrgDb.findAll({where: {orgId: id}})
            if(org)
            {
                res.status(200).send(org);
                console.log(JSON.stringify(org));
            }
        }
        catch(err)
        {
            res.status(500).send("Server error!");
            console.log(err.message);
        }
    },

    checkOrg: async function (req, res) {
        console.log('why');
        try {
            const { email, password } = req.body;

            console.log(email);
            console.log(password);
            if(!email || !password)
            {
                throw new Error("Unul sau mai multe campuri nu au fost completate");
            }
            else
            {
                const checkOrg = await OrgDb.findOne({where: {
                    email: email, 
                }})

                console.log("aici");
                if(checkOrg)
                {
                    const validPassword = await bcrypt.compare(password, checkOrg.password);
                    if(validPassword)
                    {
                        const resOrg = {
                            orgId: checkOrg.orgId,
                            permissionLevel: checkOrg.permissionLevel,
                        }
                        AuthController.loginOrg(resOrg,req,res);
                        //res.status(200).send(resOrg);
                        console.log('Autentificat!');
                    }
                    else
                    {
                        res.status(400).send(false);
                        console.log("Parola gresita");
                    }
                }
                else
                {
                    res.status(401).send(false);
                    console.log('email sau parola inexistente');
                }
            }
        }
        catch (err)
        {
            res.status(500).send("Server error");
            console.log(err.message);
        }
    },

}

module.exports = controller;