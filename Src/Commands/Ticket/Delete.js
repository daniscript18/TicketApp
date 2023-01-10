const { Client, Message } = require("discord.js");

/**
 * @param {Client} Client 
 * @param {Message} Message 
 */

module.exports = async function(Client, Message)
{
    let Tickets = require("../../Models/Tickets");
    Tickets.findOneAndRemove
    ({
        ChannelId: Message.channel.id
    },
    function(err, res)
    {
        if(err) console.log(err);
        if(res == null) Message.reply("This channel is not a Ticket.");
        else if(res != null)
        {
            console.log(res);
            Message.channel.delete();
        } 
    });
}