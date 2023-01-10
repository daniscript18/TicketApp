const Discord = require("discord.js");
const Client = new Discord.Client
({
    intents: 131071,
    partials:
    [
        Discord.Partials.Channel,
        Discord.Partials.Message,
        Discord.Partials.User
    ]
});

const Mongoose = require("mongoose");
const Servers = require("./Models/Servers");
const Config = require("./Config");

Client.Commands = new Discord.Collection();
require("./Handlers/Commands")(Client);

Client.once("ready", (Client) => console.log(`The bot ${Client.user.username} is ready!`));
Client.on("messageCreate", async (Message) =>
{
    if(Message.author.bot) return;
    try
    {
        let Prefix = (await Servers.findOne({ ServerId: Message.guild.id })).Prefix;
        if(!Prefix || Prefix == undefined || Prefix == null) Prefix = Config.Prefix;
        const Command = Message.content.toString().slice(Prefix.length).trim().split(" ")[0];
        let Arguments = Message.content.slice(Prefix.length).trim();
        if(Arguments.toLowerCase().startsWith(Command)) Arguments = Arguments.slice(Command.length).trim().split(" ");

        if(!Message.content.startsWith(Prefix)) return;
        const File = Client.Commands.get(Command);
        if(!File) return;
        File.run(Client, Message, Arguments);
    }
    catch (e)
    {
        console.error(e);
    }

    if(!await Servers.findOne({ ServerId: Message.guild.id }))
    {
        Servers.create
        ({ 
            ServerId: Message.guild.id,
            Prefix: Config.Prefix,
            TicketCout: 0
        },
        function(err, res)
        {
            if(err) console.log(err);
            console.log(res);
        });
    }
});
Client.on("guildMemberAdd", async (Member) =>
{
    if(Member.user.bot && Member.user.id === Client.user.id)
    {
        if(!await Servers.findOne({ ServerId: Message.guild.id }))
        {
            Servers.create
            ({ 
                ServerId: Message.guild.id,
                Prefix: Config.Prefix,
                TicketCout: 0
            },
            function(err, res)
            {
                if(err) console.log(err);
                console.log(res);
            });
        }
    }
});

Client.login(Config.Token);

Mongoose.set("strictQuery", false);
Mongoose.connect(Config.Mongoose)
    .then(() => console.log("You have connected to the database!"))
    .catch(e => console.error(e));