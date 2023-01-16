const Discord = require("discord.js");
module.exports =
{
    Name: "ticket",
    Options: 
    [
        {
            name: "create",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            description: "This is a ticket create command",
            options:
            [
                {
                    name: "user",
                    description: "This is a user",
                    type: Discord.ApplicationCommandOptionType.User,
                    required: false
                }
            ]
        },
        {
            name: "close",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            description: "This is a ticket close command",
            options:
            [
                {
                    name: "ticket",
                    description: "This is a ticket",
                    type: Discord.ApplicationCommandOptionType.Channel,
                    required: false
                }
            ]
        },
        {
            name: "delete",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            description: "This is a ticket delete command",
            options:
            [
                {
                    name: "ticket",
                    description: "This is a ticket",
                    type: Discord.ApplicationCommandOptionType.Channel,
                    required: false
                }
            ]
        }
    ],
    Type: Discord.ApplicationCommandType.ChatInput,
    Description: "This is a ticket command",
    run: async (Client, Interaction) =>
    {
        switch(Interaction.options.getSubcommand())
        {
            case "create": return await require("./Ticket/Create")(Interaction);
            case "close": return await require("./Ticket/Close")(Interaction);
            case "delete": return await require("./Ticket/Delete")(Interaction);
            default: return Interaction.reply("An error occurred");
        }
    }
}