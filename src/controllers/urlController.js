const Url  = require("../model/url");
const db = require("../db/database");


const urlController = class{
    constructor(){
        db.connect();
    }

    findUrl(url){
        return new Promise((resolve, reject) => {
            Url.findOne({shortUrl : url})
            .then(
                res => resolve(res),
                err => reject(new Error(err)),
            )
        });
    }

    saveUrl(origUrl, shortUrl, username){
        return new Promise((resolve, reject) => {
            Url.create({
                origUrl,
                shortUrl,
                username
            })
            .then(
                res => resolve(res),
                err => reject(new Error(err)),
            )
        });
    }

    countUrlByUserName(username){
        return new Promise((resolve, reject) => {
            Url.countDocuments({username:username})
            .then(
                res => resolve(res),
                err => reject(new Error(err)),
            )
        })
    }

    getUserHistory(username){
        return new Promise((resolve, reject) => {
            Url.find({username:username})
            .then(
                res => {
                    if (res.length < 1){
                        reject(new Error("No URL created by the user"));
                    }
                    resolve(res);
                },
                err => reject(new Error(err)),
            )
        });
    }
}

module.exports = urlController;