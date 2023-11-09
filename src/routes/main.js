const express = require("express");
const UrlController = require('../controllers/urlController.js');
const redis = require('redis');

const app = express.Router();
const urlController = new UrlController();
app.use(express.json());

const client = redis.createClient();
client.connect();
 
client.on("error", (error) => {
 console.error(error);
});

//healthCheck
app.get("/",(req, res) => {
    return res.status(200).send('Welcom to url shortner application');
    });

//redirect
app.get('/:shortid', async(req, res) => {
    try{
        const shortid = req.params.shortid;
        if (!shortid){
            res.redirect('/login');
        }
        let url = await client.get(shortid);
        if (!url){
             const urlObject = await urlController.findUrl(shortid);
             if (!urlObject) {
                return res.status(404).send('Url not found');
            }
            url = urlObject.origUrl
            client.set(shortid, url);
        }
        res.send(url);
    } catch(err){
        res.status(500);
    }
})

module.exports = app;

