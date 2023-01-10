const Mongoose = require("mongoose");

const Tickets = new Mongoose.Schema
({
    ServerId: String,
    TicketId: String,
    ChannelId: String,
    Open: Boolean,
    Owner: String
});

module.exports = Mongoose.model("Tickets", Tickets);