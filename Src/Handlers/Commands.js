const { Client }  = require("discord.js");
const { readdir } = require("fs");

/**
 * @param {Client} Client 
 */

function Commands(Client)
{
    readdir("Src/Commands/", (err, files) =>
    {
        if(err) console.error(err);
        // 
        const jsfiles = files.filter(file => file.split(".").pop() == "js");
        if(jsfiles.length <= 0) return console.error("There are no commands in the folder.")
        
        jsfiles.forEach((file) =>
        {
            const Command = require(`../Commands/${file}`);
            Client.Commands.set(Command.name, Command);
        });
    });
}

module.exports =
{
    LoadCommands: Commands
}