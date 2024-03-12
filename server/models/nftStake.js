const mongoose = require('mongoose');
const User = require('./userModel');

const stakingPoolSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    participants: [{
        type: String 
    }],
    totalStakedAmount: {
        type: Number,
        default: 0
    },
    endTime: {
        type: String, 
        required: true
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
    },
    cid : {
        type: String,
    },
    transaction : {
        type: String,
    },
});

const StakingPool = mongoose.model('StakingPool', stakingPoolSchema);

module.exports = StakingPool;
