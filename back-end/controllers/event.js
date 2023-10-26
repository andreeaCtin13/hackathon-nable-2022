const EventDb = require('../models/index').Event;
const controller = {
    createEvent : async function (req, res) {
        try {
            const event = {
                eventName: req.body.eventName,
                description: req.body.description,
                city: req.body.city,
                location: req.body.location,
                typeOfEvent: req.body.typeOfEvent,
                orgId: req.body.orgId,
                checkedIsFeatured: req.body.checkedIsFeatured,
            };

            let errors = [];

            console.log(JSON.stringify(event));
            if(!event.eventName || !event.description || !event.city || !event.location || !event.typeOfEvent || !event.orgId || !event.checkedIsFeatured)
            {
                errors.push("Unul sau mai multe campuri nu au fost completate");
                console.log("Unul sau mai multe campuri nu au fost completate")
            }
            else 
            {
                if(event.eventName.length < 2 || event.eventName.length > 30)
                {
                    errors.push("Numele trebuie sa contina mai mult de 2 litere si mai putin de 30")
                    console.log("Numele trebuie sa contina mai mult de 2 litere si mai putin de 30")
                }
                else if(!event.eventName.match('^[a-zA-ZÀ-žșȘțȚăĂîÎâÂ-]+$'))
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
                const newEvent = await EventDb.create({
                    eventName: event.eventName,
                    description: event.description,
                    city: event.city,
                    location: event.location,
                    typeOfEvent: event.typeOfEvent,
                    orgId: event.orgId,
                    checkedIsFeatured: event.checkedIsFeatured,
                })

                res.status(200).send(newEvent);
            }
        }
        catch (err) {
            res.status(500).send(err.message);
            console.log(err.message);
        }
    },

    geEventById: async function (req, res) {
        try{
            const id = req.params.id;
            console.log(id);
            const event = await EventDb.findAll({where: {eventId: id}})
            if(event)
            {
                res.status(200).send(event);
                console.log(JSON.stringify(event));
            }
        }
        catch(err)
        {
            res.status(500).send("Server error!");
            console.log(err.message);
        }
    }
}

module.exports = controller;