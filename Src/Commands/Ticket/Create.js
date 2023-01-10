const discord = require("discord.js");
const { Client, Message } = discord;

/**
 * @param {Client} Client 
 * @param {Message} Message 
 */

module.exports = async function(Client, Message)
{
    Message.guild.channels.create
    ({
        name: `ticket-${Message.author.username}`,
        type: discord.ChannelType.GuildText,
        permissionOverwrites:
        [
            {
                id: Message.author.id,
                allow: discord.PermissionsBitField.Flags.ViewChannel
            },
            {
                id: Message.guild.id,
                deny: discord.PermissionsBitField.Flags.ViewChannel
            }
        ]
    }).then(async (Channel) =>
    {
        let Tickets = require("../../Models/Tickets");
        let Servers = require("../../Models/Servers");

        let TicketCout = (await Servers.findOne({ ServerId: Message.guild.id })).TicketCout;

        Tickets.create
        ({
            ServerId: Message.guild.id,
            TicketId: TicketCout+1,
            ChannelId: Channel.id,
            Open: true,
            Owner: Message.author.id
        },
        function(err, res)
        {
            if(err) console.log(err);
            console.log(res);
        });

        Servers.findOneAndUpdate
        ({
            ServerId: Message.guild.id
        },
        {
            $set: { TicketCout: TicketCout+1 }
        },
        function(err, res)
        {
            if(err) console.log(err);
            console.log(res);
        });

        Message.reply(`Se creó el ticket, <#${Channel.id}>`)
    });
}