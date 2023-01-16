const fs = require("fs");
const FileScanner = require("node-recursive-directory");

module.exports = async (Client, Path) =>
{
    const ScannedFiles = await FileScanner(`${Path}/Interactions/SlashCommands`);
    ScannedFiles.forEach(File =>
    {
        if(fs.statSync(File).isDirectory()) return;
        const SlashCommand = require(File);
        Client.SlashCommands.set(SlashCommand.Name, SlashCommand);
    });
    let promise = Promise.resolve();
    ScannedFiles.forEach(async function(File)
    {
        promise = promise.then(async function()
        {
            const Interval = 5000;
            if(fs.statSync(File).isDirectory()) return;
            const SlashCommand = require(File);

            if(SlashCommand.Guilds && Array.isArray(SlashCommand.Guilds)) SlashCommand.Guilds.forEach(async Guild =>
            {
                Guild = Client.guilds.cache.get(Guild) ?? await Client.guilds.fetch(Guild);
                const Interaction = Guild.commands.cache.find(Command => Command.Name == SlashCommand.Name);
                if(Interaction && SlashCommand != undefined)
                {
                    if(typeof SlashCommand === "function") return;
                    await guild.commands.edit
                    (
                        Interaction.id,
                        {
                            name: SlashCommand.Name,
                            description: SlashCommand.Description,
                            options: SlashCommand.Options,
                            type: SlashCommand.Type
                        }
                    );
                }
                else if(!Interaction && SlashCommand != undefined)
                {
                    if(typeof SlashCommand === "function") return;
                    await Guild.commands.create
                    (
                        {
                            name: SlashCommand.Name,
                            description: SlashCommand.Description,
                            options: SlashCommand.Options,
                            type: SlashCommand.Type
                        }
                    );
                }
            });
            else
            {
                const Interaction = Client.application.commands.cache.find(Command => Command.Name == SlashCommand.Name);
                if(Interaction && SlashCommand != undefined)
                {
                    if(typeof SlashCommand === "function") return;
                    await Client.application.commands.edit
                    (
                        Interaction.id,
                        {
                            name: SlashCommand.Name,
                            description: SlashCommand.Description,
                            options: SlashCommand.Options,
                            type: SlashCommand.Type
                        }
                    );
                }
                else if(!Interaction && SlashCommand != undefined)
                {
                    if(typeof SlashCommand === "function") return;
                    await Client.application.commands.create
                    (
                        {
                            name: SlashCommand.Name,
                            description: SlashCommand.Description,
                            options: SlashCommand.Options,
                            type: SlashCommand.Type
                        }
                    );
                }
            }
            return new Promise(function(resolve)
            {
                setTimeout(resolve, Interval);
            });
        });
    });
}