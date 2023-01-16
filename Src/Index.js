const Discord = require("discord.js");
const Handlers = require("./Handlers/Index");
const Config = require("./Config");
const Mongoose = require("mongoose");

const Client = new Discord.Client
(
    {
        allowedMentions:
        {
            repliedUser: false
        },
        partials:
        [
            Discord.Partials.Channel,
            Discord.Partials.Message,
            Discord.Partials.User
        ],
        presence:
        {
            activities:
            [
                {
                    name: "This Bot is Open Source",
                    type: Discord.ActivityType.Watching
                }
            ]
        },
        intents: 131071
    }
);

Client.Events = new Discord.Collection();
Client.SlashCommands = new Discord.Collection();

(
    async () =>
    {
        await Handlers.LoadEvents(Client, __dirname);

        Client.login(Config.GetToken);
        Mongoose.set("strictQuery", false);
        Mongoose.connect(Config.GetMongoUrl)
            .then(() => console.log("You have connected to the database!"))
            .catch(e => console.error(e));

        setTimeout(async function ()
        {
            await Handlers.LoadSlashCommands(Client, __dirname);
        }, 1000);
        
    }
)();