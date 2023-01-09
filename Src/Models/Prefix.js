const mongoose = require("mongoose");

const Prefix = new mongoose.Schema
({
    Server: String,
    Prefix: String
});

const Model = module.exports = mongoose.model("prefix", Prefix);