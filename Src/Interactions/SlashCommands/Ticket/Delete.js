const Tickets = require("../../../Models/Tickets");

module.exports = async (Interaction) =>
{
    const Channel = Interaction.options.getChannel("ticket") || Interaction.channel;
    const Ticket = await Tickets.findOne({ CHANNEL: Channel.id });
    if(!Ticket) return Interaction.reply({ content: "This channel is not a Ticket.", ephemeral: true });
    Tickets.findOneAndRemove
    (
        {
            CHANNEL: Channel.id
        },
        async function(err, res)
        {
            if(err) console.log(err);
            if(res)
            {
                console.log(res);
                const _Channel = Interaction.guild.channels.cache.get(res.CHANNEL);
                Interaction.reply({ content: "Successfully", ephemeral: true });
                _Channel.send({ content: "The ticket will be deleted in 5 seconds." });
                setTimeout(function(){ _Channel.delete(); }, 5000); 
            }
        }
    );
}