const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const jwtSecret = process.env.TOKEN_SECRET; 
async function loginUser(user,req,res) {
        try{
            let refreshId = user.userId + jwtSecret;
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');
            req.body.refreshKey = salt;
            let token = jwt.sign(user, jwtSecret);
            let b = Buffer.from(hash);
            let refresh_token = b.toString('base64');
            res.status(201).send({accessToken: token, refreshToken: refresh_token});    
        }
        catch(err) {
            res.status(500).send(err.message);
        }
}

async function loginOrg(org,req,res) {
        try{
            let refreshId = org.orgId + jwtSecret;
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');
            req.body.refreshKey = salt;
            let token = jwt.sign(org, jwtSecret);
            let b = Buffer.from(hash);
            let refresh_token = b.toString('base64');
            res.status(201).send({accessToken: token, refreshToken: refresh_token});    
    
        }
        catch(err) {
            res.status(500).send(err.message);
        }
    }



module.exports = {loginOrg, loginUser};