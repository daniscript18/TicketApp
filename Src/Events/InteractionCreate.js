const Servers = require("../Models/Servers");
const Discord = require("discord.js");

module.exports =
{
    Name: "interactionCreate",
    run: async (Interaction, Client) =>
    {
        if(!await Servers.findOne({ SERVER: Interaction.guild.id }))
        {
            Servers.create
            (
                {
                    SERVER: Interaction.guild.id,
                    TICKETS:
                    {
                        COUNT: 0,
                        PREFIX:
                        {
                            OPEN: "ticket-@COUNT",
                            CLOSE: "close-@COUNT"
                        },
                        PERMISSIONS:
                        {
                            ROLES: [],
                            ADMINS: [],
                            CHANNELS:
                            {
                                USERS: 
                                {
                                    ALLOW:
                                    [
                                        Discord.PermissionFlagsBits.AddReactions,
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.SendTTSMessages,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.ReadMessageHistory,
                                        Discord.PermissionFlagsBits.UseExternalEmojis,
                                        Discord.PermissionFlagsBits.UseApplicationCommands,
                                        Discord.PermissionFlagsBits.CreatePublicThreads,
                                        Discord.PermissionFlagsBits.UseExternalStickers,
                                        Discord.PermissionFlagsBits.SendMessagesInThreads
                                    ],
                                    DENY:
                                    [
                                        Discord.PermissionFlagsBits.CreateInstantInvite,
                                        Discord.PermissionFlagsBits.ManageChannels,
                                        Discord.PermissionFlagsBits.ManageMessages,
                                        Discord.PermissionFlagsBits.MentionEveryone,
                                        Discord.PermissionFlagsBits.ManageRoles,
                                        Discord.PermissionFlagsBits.ManageWebhooks,
                                        Discord.PermissionFlagsBits.ManageThreads,
                                        Discord.PermissionFlagsBits.CreatePrivateThreads
                                    ]
                                },
                                ROLES:
                                {
                                    ALLOW:
                                    [
                                        Discord.PermissionFlagsBits.AddReactions,
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.SendTTSMessages,
                                        Discord.PermissionFlagsBits.ManageMessages,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.ReadMessageHistory,
                                        Discord.PermissionFlagsBits.MentionEveryone,
                                        Discord.PermissionFlagsBits.UseExternalEmojis,
                                        Discord.PermissionFlagsBits.UseApplicationCommands,
                                        Discord.PermissionFlagsBits.ManageThreads,
                                        Discord.PermissionFlagsBits.CreatePublicThreads,
                                        Discord.PermissionFlagsBits.UseExternalStickers,
                                        Discord.PermissionFlagsBits.SendMessagesInThreads
                                    ],
                                    DENY:
                                    [
                                        Discord.PermissionFlagsBits.CreateInstantInvite,
                                        Discord.PermissionFlagsBits.ManageChannels,
                                        Discord.PermissionFlagsBits.ManageRoles,
                                        Discord.PermissionFlagsBits.ManageWebhooks,
                                        Discord.PermissionFlagsBits.CreatePrivateThreads
                                    ]
                                },
                                ADMINS:
                                {
                                    ALLOW:
                                    [
                                        Discord.PermissionFlagsBits.ManageChannels,
                                        Discord.PermissionFlagsBits.AddReactions,
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.SendTTSMessages,
                                        Discord.PermissionFlagsBits.ManageMessages,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.ReadMessageHistory,
                                        Discord.PermissionFlagsBits.MentionEveryone,
                                        Discord.PermissionFlagsBits.UseExternalEmojis,
                                        Discord.PermissionFlagsBits.ManageRoles,
                                        Discord.PermissionFlagsBits.ManageWebhooks,
                                        Discord.PermissionFlagsBits.UseApplicationCommands,
                                        Discord.PermissionFlagsBits.ManageThreads,
                                        Discord.PermissionFlagsBits.CreatePublicThreads,
                                        Discord.PermissionFlagsBits.UseExternalStickers,
                                        Discord.PermissionFlagsBits.SendMessagesInThreads
                                    ],
                                    DENY:
                                    [
                                        Discord.PermissionFlagsBits.CreateInstantInvite,
                                        Discord.PermissionFlagsBits.CreatePrivateThreads
                                    ]
                                }
                            },
                            COMMANDS:
                            {
                                HELP: ["ALL"],
                                OPEN: ["ALL"],
                                CLOSE: ["ALL"],
                                DELETE: ["ROLES", "ADMINS"],
                                CONFIG: ["ADMINS"]
                            }
                        }
                    }
                },
                function(err, res)
                {
                    if(err) console.log(err);
                    console.log(res);
                }
            );
        }

        if(Interaction.isChatInputCommand())
        {
            const Command = Client.SlashCommands.get(Interaction.commandName);
            if(!Command) return;
            Command.run(Client, Interaction);
        }
        else if(Interaction.isContextMenuCommand())
        {
            const Command = Client.ContextMenus.get(Interaction.commandName);
            if(!Command) return;
            Command.run(Client, Interaction);
        }
        else if(Interaction.isStringSelectMenu())
        {
            if(Client.SelectMenus.get(Interaction.values[0]))
            {
                const Command = Client.SelectMenus.get(Interaction.values[0]);
                if(!Command) return;
                Command.run(Client, Interaction);
            }
            else
            {
                const Command = Client.SelectMenus.get(Interaction.customId);
                if(!Command) return;
                Command.run(Client, Interaction);
            }
        }
        else if(Interaction.isButton())
        {
            const Command = Client.Buttons.get(Interaction.customId);
            if(!Command) return;
            Command.run(Client, Interaction);
        }
        else if(Interaction.isModalSubmit())
        {
            const Command = Client.Modals.get(Interaction.customId);
            if(!Command) return;
            Command.run(Client, Interaction);
        }
    }
}