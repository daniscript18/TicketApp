const discord = require("discord.js");
const { Client, Message } = discord;

module.exports =
{
    name: "ticket",

    /**
     * @param {Client} Client 
     * @param {Message} Message 
     */

    run: async (Client, Message, Args) =>
    {
        if(!Message.member.permissions.has(discord.PermissionsBitField.Flags.ManageMessages)) return Message.reply("You don't have permissions.")
        if(!Args || !Args[0] || Args[1]) return Message.reply("Use `ticket create`, `ticket close` or `ticket delete`.");
        if(Args[0] == "create") return require("./Ticket/Create")(Client, Message);
        else if(Args[0] == "close") return require("./Ticket/Close")(Client, Message);
        else if(Args[0] == "delete") return require("./Ticket/Delete")(Client, Message);
        else return Message.reply("Use `ticket create`, `ticket close` or `ticket delete`.");
    }
}