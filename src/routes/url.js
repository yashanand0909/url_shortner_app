const express = require("express");
const UrlController = require('../controllers/urlController.js');
const UserController = require('../controllers/userController.js');
const auth = require("../middleware/auth.js");
const gen = require("../utils/utils.js");

const app = express.Router();
const urlController = new UrlController();
const userController = new UserController();
require("dotenv").config();
app.use(express.json());

app.post('/short', auth, async (req, res) => {
    try{
        const username = req.user;
        const user = await userController.findUser(username);
        if (!user){
            throw new Error("Internal error while getting user");
        }
        const allowedVal = JSON.parse(process.env.TIER_DEFINATION)[user.tier];
        const totalRequestUser = await urlController.countUrlByUserName(username);
        if (totalRequestUser >= allowedVal){
            return res.status(200).send('User has reached its request limit please upgrade.')
        }
        let {orignalUrl, shortEndpoint} = req.body;
        if (!orignalUrl){
            return res.status(400).send("OrignalUrl is required.")
        }
        if (shortEndpoint){
            const url = await urlController.findUrl(shortEndpoint);
            if (url){
                return res.status(400).send("short endpoint already exists");
            }
        }
        else {
            shortEndpoint = gen();
            const url = await urlController.findUrl(shortEndpoint);
            while (url){
                shortEndpoint = gen();
                const url = await urlController.findUrl(shortEndpoint);
            }
        }
        const url = await urlController.saveUrl(orignalUrl, shortEndpoint, username);
        res.status(200).send(url)
        
    } catch(err){
        res.status(500).send(""+err)
    }
});


app.get('/history', auth, async(req, res) => {
    try{
        const username = req.user;
        const history =  await urlController.getUserHistory(username);
        res.status(200).send(history);
    } catch(err){
        res.status(500).send(""+err)
    }
})

module.exports = app;

