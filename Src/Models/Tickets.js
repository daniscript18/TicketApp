const Mongoose = require("mongoose");

const Schema = Mongoose.Schema
(
    {
        SERVER: String,
        COUNT: Number,
        CHANNEL: String,
        CREATOR: String,
        OPEN: Boolean
    }
);

module.exports = Mongoose.model("Tickets", Schema);