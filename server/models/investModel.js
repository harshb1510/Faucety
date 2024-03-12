const mongoose = require("mongoose");
const investSchema = new mongoose.Schema({
    coinName : {
        type: String,
        default: "ETH",
    },
    totalAmount : {
        type: Number,
    },
    dip : {
        type: Number,
    },
    userId : {
        type: String,
    },
    remainInvest : {
        type: Number,
    },
    invested : {
        type: Number,
    },
});
const Invest = mongoose.model("Invest", investSchema);
module.exports = Invest;