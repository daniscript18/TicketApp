require("dotenv").config();

module.exports =
{
    Token: process.env.TOKEN || "",
    Mongoose: process.env.MONGOOSE || "",
    Prefix: "!"
}