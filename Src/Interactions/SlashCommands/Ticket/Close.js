const Tickets = require("../../../Models/Tickets");
const Servers = require("../../../Models/Servers");

module.exports = async (Interaction) =>
{
    const Channel = Interaction.options.getChannel("ticket") || Interaction.channel;
    const Ticket = await Tickets.findOne({ CHANNEL: Channel.id });
    if(!Ticket) return Interaction.reply({ content: "This channel is not a Ticket.", ephemeral: true });
    const Server = await Servers.findOne({ SERVER: Interaction.guild.id });
    Tickets.findOneAndUpdate
    (
        {
            CHANNEL: Channel.id
        },
        {
            $set:
            { 
                "OPEN": false
            }
        },
        function(err, res)
        {
            if(err) console.log(err);
            if(res)
            {
                console.log(res);
                const _Channel = Interaction.client.channels.cache.get(res.CHANNEL);
                const User = Interaction.client.users.cache.get(res.CREATOR);
                _Channel.permissionOverwrites.delete(User.id);
                _Channel.setName(String(Server.TICKETS.PREFIX.CLOSE).replace("@COUNT", res.COUNT).replace("@USER", User.username));
                Interaction.reply({ content: "Ticket closed successfully.", ephemeral: true });
            }
        }
    );
}