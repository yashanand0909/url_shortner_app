const path = require('path')
require('dotenv').config

const config = {
    'root' : path.join(__dirname , '/../../'),
    'controllers' : path.join(__dirname , '/../controllers'),
    'mongoDB' : 'mongodb+srv://yashanand0909:yashanand0909@urlshortener.vbmdynk.mongodb.net/'
}

module.exports = config;