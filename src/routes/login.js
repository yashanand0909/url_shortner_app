const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const UserController = require('../controllers/userController.js');
const auth = require("../middleware/auth.js");

require("dotenv").config();

const app = express.Router();
const User = new UserController();
app.use(express.json());


// Register
app.post("/register", async (req, res) => {
    try{
        const {username, password, tier} = req.body;
        console.log(req.body);
        if (!(username && password && tier)){
            return res.status(400).send("All fields are required");
        }
        
        const oldUser = await User.findUser(username);
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        let encrypted = await bcrypt.hash(password, 10)
        const user = await User.saveUser(username,encrypted, tier);
        const token = jwt.sign(
            { username: user.username },
            process.env.TOKEN_KEY,
            {
              expiresIn: "3h",
            }
        );
        res.status(201).send({username:username, token : token})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
      }
    });
    
// Login
app.post("/userlogin", async (req, res) => {
    try{
        const {username, password} = req.body;
        if(!(username && password)){
            return res.status(400).send("All fields is required");
        }

        const user = await User.findUser(username);
        if (!user){
            return res.status(400).send("User does not exists. Please signup first");
        }
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
            { username: user.username },
            process.env.TOKEN_KEY,
            {
                expiresIn: "3h",
            }
            );
            return res.status(200).send({username:username, token : token});
        }
        res.status(400).send("Invalid Credentials");
    }
    catch(err){
        console.log(err)
        res.status(501).send("Loging failed due to temp error"+err);
    }

    });

module.exports = app;

