const UserDb = require('../models/index').User;
const bcrypt = require('bcryptjs');
const AuthController = require('./auth')
const controller = {
    createUser : async function (req, res) {
        try {
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                city: req.body.city,
                birthday: req.body.birthday,
            };

            let errors = [];

            if(!user.name || !user.email || !user.password || !user.phone || !user.city || !user.birthday)
            {
                errors.push("Unul sau mai multe campuri nu au fost completate");
                console.log("Unul sau mai multe campuri nu au fost completate")
            }
            else 
            {
                if(user.name.length < 2 || user.name.length > 30)
                {
                    errors.push("Numele trebuie sa contina mai mult de 2 litere si mai putin de 30")
                    console.log("Numele trebuie sa contina mai mult de 2 litere si mai putin de 30")
                }
                else if(!user.name.match('^[a-zA-ZÀ-žșȘțȚăĂîÎâÂ-]+$'))
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
                const encryptedPassword = await bcrypt.hash(user.password, 10);
                const newUser = await UserDb.create({
                    name: user.name,
                    email: user.email.toLowerCase(),
                    password: encryptedPassword,
                    phone: user.phone,
                    city: user.city,
                    birthday: user.birthday,
                })

                res.status(200).send(newUser);
            }
        }
        catch (err) {
            res.status(500).send(err.message);
            console.log(err.message);
        }
    },

    getUserById: async function (req, res) {
        try{
            const id = req.params.id;
            console.log(id);
            const user = await UserDb.findAll({where: {userId: id}})
            if(user)
            {
                res.status(200).send(user);
                console.log(JSON.stringify(user));
            }
        }
        catch(err)
        {
            res.status(500).send("Server error!");
            console.log(err.message);
        }
    },

    checkUser: async function (req, res) {
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
                const checkUser = await UserDb.findOne({where: {
                    email: email, 
                }})

                console.log("aici");
                if(checkUser)
                {
                    
                    const validPassword = await bcrypt.compare(password, checkUser.password);
                    if(validPassword)
                    {
                        //returnez tot obiectul? ne intereseaza userId + permissionLevel
                        const resUser = {
                            userId: checkUser.userId,
                            permissionLevel: checkUser.permissionLevel,
                        };
                        AuthController.loginUser(resUser,req,res);
                        //res.status(200).send(resUser);
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