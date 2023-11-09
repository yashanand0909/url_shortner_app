const User  = require("../model/user");
const db = require("../db/database");

const controller = class UserController {
    constructor() {
        db.connect();
    }

    findUser (username){
        return new Promise((resolve, reject) => {
            User.findOne({username})
            .then(
                res => resolve(res),
                err => reject(new Error(err)),
            )
        });
    }

    saveUser (username, password, tier){
        return new Promise((resolve, reject) => {
            User.create({
                username,
                password,
                tier
            })
            .then(
                res => resolve(res),
                err => reject(new Error(err)),
            )
        });
    }

}

module.exports = controller;