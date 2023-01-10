const Mongoose = require("mongoose");

const Servers = new Mongoose.Schema
({
    ServerId: String,
    Prefix: String,
    TicketCout: Number
});

module.exports = Mongoose.model("Servers", Servers);