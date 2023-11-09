const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true 
    },
    password: { 
        type: String 
    },
    tier: {
        type: String, 
        enum : ['TIER_1', 'TIER_2', 'TIER_3']
    }
});

module.exports = mongoose.model("user", userSchema);