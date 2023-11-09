const { default: mongoose } = require("mongoose");

const url = new mongoose.Schema({
    origUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        index: true
    },
    username: {
        type: String, 
        required: true
    },
    creatredAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model("url", url);