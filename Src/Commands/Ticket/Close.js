const { Client, Message } = require("discord.js");

/**
 * @param {Client} Client 
 * @param {Message} Message 
 */

module.exports = async function(Client, Message)
{
    let Tickets = require("../../Models/Tickets");
    Tickets.findOneAndUpdate
    ({
        ChannelId: Message.channel.id
    },
    {
        $set: { Open: false }
    },
    function(err, res)
    {
        if(err) console.log(err);
        if(res == null) Message.reply("This channel is not a Ticket.");
        else if(res != null)
        {
            console.log(res);
            const Channel = Client.channels.cache.get(res.ChannelId);
            const User = Client.users.cache.get(res.Owner);
            Channel.setName(`close-${User.username}`);
            Channel.permissionOverwrites.edit(User.id, { ViewChannel: false });
            Message.reply("Ticket closed successfully.");
        } 
    });
}