const Discord = require("discord.js");
const Commands = require("./Handlers/Commands");
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
const PrefixModel = require("./Models/Prefix");
const Config = require("./Config");

Client.Commands = new Discord.Collection();
Commands.LoadCommands(Client);

Client.once("ready", (Client) => console.log(`The bot ${Client.user.username} is ready!`));
Client.on("messageCreate", async (Message) =>
{
    if(Message.author.bot) return;
    try
    {
        const Prefix = await PrefixModel.findOne({Server: Message.guild.id}).Prefix || Config.Prefix;
        const Command = Message.content.split(" ")[0];
        const Arguments = Command.slice(1);

        if(!Message.content.startsWith(Prefix)) return;
        const File = Client.Commands.get(Command.slice(Prefix.length));
        if(!File) return;
        File.run(Client, Message, Arguments);
    }
    catch (e)
    {
        console.error(e);
    }
});

Client.login(Config.Token);

Mongoose.set("strictQuery", false);
Mongoose.connect(Config.Mongoose)
    .then(() => console.log("You have connected to the database!"))
    .catch(e => console.error(e));