const Discord = require("discord.js");
const Servers = require("../../../Models/Servers");
const Tickets = require("../../../Models/Tickets");

module.exports = async (Interaction) =>
{
    const Server = await Servers.findOne({ SERVER: Interaction.guild.id });
    let Creator = Interaction.options.getUser("user") || Interaction.user;
    await Interaction.guild.channels.create
    (
        {
            name: String(Server.TICKETS.PREFIX.OPEN).replace("@COUNT", Server.TICKETS.COUNT+1).replace("@USER", Interaction.user.username),
            type: Discord.ChannelType.GuildText,
            permissionOverwrites:
            [
                {
                    id: Interaction.guild.id,
                    deny: [ Server.TICKETS.PERMISSIONS.CHANNELS.USERS.ALLOW, Server.TICKETS.PERMISSIONS.CHANNELS.USERS.DENY ]
                },
                {
                    id: Creator.id,
                    allow: Server.TICKETS.PERMISSIONS.CHANNELS.USERS.ALLOW,
                    deny: Server.TICKETS.PERMISSIONS.CHANNELS.USERS.DENY
                }
            ]
        }
    ).then(async (Channel) =>
    {
        let PermissionsRoleAllow = {};
        let PermissionsRoleDeny = {};
        for(let permission of Server.TICKETS.PERMISSIONS.CHANNELS.ROLES.ALLOW)
        {
            PermissionsRoleAllow[permission] = true;
        }
        for(let permission of Server.TICKETS.PERMISSIONS.CHANNELS.ROLES.DENY)
        {
            PermissionsRoleDeny[permission] = false;
        }
        let RolePermissions = Object.assign({}, PermissionsRoleAllow, PermissionsRoleDeny);
        for(let key in RolePermissions)
        {
            if(key == "64")
            {
                RolePermissions["AddReactions"] = RolePermissions[key];
                delete RolePermissions["64"];
            }
            if(key == "1024")
            {
                RolePermissions["ViewChannel"] = RolePermissions[key];
                delete RolePermissions["1024"];
            }
            if(key == "2048")
            {
                RolePermissions["SendMessages"] = RolePermissions[key];
                delete RolePermissions["2048"];
            }
            if(key == "4096")
            {
                RolePermissions["SendTTSMessages"] = RolePermissions[key];
                delete RolePermissions["4096"];
            }
            if(key == "16384")
            {
                RolePermissions["EmbedLinks"] = RolePermissions[key];
                delete RolePermissions["16384"];
            }
            if(key == "32768")
            {
                RolePermissions["AttachFiles"] = RolePermissions[key];
                delete RolePermissions["32768"];
            }
            if(key == "65536")
            {
                RolePermissions["ReadMessageHistory"] = RolePermissions[key];
                delete RolePermissions["65536"];
            }
            if(key == "262144")
            {
                RolePermissions["UseExternalEmojis"] = RolePermissions[key];
                delete RolePermissions["262144"];
            }
            if(key == "2147483648")
            {
                RolePermissions["UseApplicationCommands"] = RolePermissions[key];
                delete RolePermissions["2147483648"];
            }
            if(key == "34359738368")
            {
                RolePermissions["CreatePublicThreads"] = RolePermissions[key];
                delete RolePermissions["34359738368"];
            }
            if(key == "137438953472")
            {
                RolePermissions["UseExternalStickers"] = RolePermissions[key];
                delete RolePermissions["137438953472"];
            }
            if(key == "274877906944")
            {
                RolePermissions["SendMessagesInThreads"] = RolePermissions[key];
                delete RolePermissions["274877906944"];
            }
            if(key == "1")
            {
                RolePermissions["CreateInstantInvite"] = RolePermissions[key];
                delete RolePermissions["1"];
            }
            if(key == "16")
            {
                RolePermissions["ManageChannels"] = RolePermissions[key];
                delete RolePermissions["16"];
            }
            if(key == "8192")
            {
                RolePermissions["ManageMessages"] = RolePermissions[key];
                delete RolePermissions["8192"];
            }
            if(key == "131072")
            {
                RolePermissions["MentionEveryone"] = RolePermissions[key];
                delete RolePermissions["131072"];
            }
            if(key == "268435456")
            {
                RolePermissions["ManageRoles"] = RolePermissions[key];
                delete RolePermissions["268435456"];
            }
            if(key == "536870912")
            {
                RolePermissions["ManageWebhooks"] = RolePermissions[key];
                delete RolePermissions["536870912"];
            }
            if(key == "17179869184")
            {
                RolePermissions["ManageThreads"] = RolePermissions[key];
                delete RolePermissions["17179869184"];
            }
            if(key == "68719476736")
            {
                RolePermissions["CreatePrivateThreads"] = RolePermissions[key];
                delete RolePermissions["68719476736"];
            }
        }
        if(Server.TICKETS.PERMISSIONS.ROLES && Array.isArray(Server.TICKETS.PERMISSIONS.ROLES) && Array(Server.TICKETS.PERMISSIONS.ROLES).length != 0)
        {
            Server.TICKETS.PERMISSIONS.ROLES.forEach(Role =>
            {
                Channel.permissionOverwrites.create(Role, RolePermissions);
            });
        }
        let PermissionsAdminAllow = {};
        let PermissionsAdminDeny = {};
        for(let permission of Server.TICKETS.PERMISSIONS.CHANNELS.ADMINS.ALLOW)
        {
            PermissionsAdminAllow[permission] = true;
        }
        for(let permission of Server.TICKETS.PERMISSIONS.CHANNELS.ADMINS.DENY)
        {
            PermissionsAdminDeny[permission] = false;
        }
        let AdminPermissions = Object.assign({}, PermissionsAdminAllow, PermissionsAdminDeny);
        for(let key in AdminPermissions)
        {
            if(key == "64")
            {
                AdminPermissions["AddReactions"] = AdminPermissions[key];
                delete AdminPermissions["64"];
            }
            if(key == "1024")
            {
                AdminPermissions["ViewChannel"] = AdminPermissions[key];
                delete AdminPermissions["1024"];
            }
            if(key == "2048")
            {
                AdminPermissions["SendMessages"] = AdminPermissions[key];
                delete AdminPermissions["2048"];
            }
            if(key == "4096")
            {
                AdminPermissions["SendTTSMessages"] = AdminPermissions[key];
                delete AdminPermissions["4096"];
            }
            if(key == "16384")
            {
                AdminPermissions["EmbedLinks"] = AdminPermissions[key];
                delete AdminPermissions["16384"];
            }
            if(key == "32768")
            {
                AdminPermissions["AttachFiles"] = AdminPermissions[key];
                delete AdminPermissions["32768"];
            }
            if(key == "65536")
            {
                AdminPermissions["ReadMessageHistory"] = AdminPermissions[key];
                delete AdminPermissions["65536"];
            }
            if(key == "262144")
            {
                AdminPermissions["UseExternalEmojis"] = AdminPermissions[key];
                delete AdminPermissions["262144"];
            }
            if(key == "2147483648")
            {
                AdminPermissions["UseApplicationCommands"] = AdminPermissions[key];
                delete AdminPermissions["2147483648"];
            }
            if(key == "34359738368")
            {
                AdminPermissions["CreatePublicThreads"] = AdminPermissions[key];
                delete AdminPermissions["34359738368"];
            }
            if(key == "137438953472")
            {
                AdminPermissions["UseExternalStickers"] = AdminPermissions[key];
                delete AdminPermissions["137438953472"];
            }
            if(key == "274877906944")
            {
                AdminPermissions["SendMessagesInThreads"] = AdminPermissions[key];
                delete AdminPermissions["274877906944"];
            }
            if(key == "1")
            {
                AdminPermissions["CreateInstantInvite"] = AdminPermissions[key];
                delete AdminPermissions["1"];
            }
            if(key == "16")
            {
                AdminPermissions["ManageChannels"] = AdminPermissions[key];
                delete AdminPermissions["16"];
            }
            if(key == "8192")
            {
                AdminPermissions["ManageMessages"] = AdminPermissions[key];
                delete AdminPermissions["8192"];
            }
            if(key == "131072")
            {
                AdminPermissions["MentionEveryone"] = AdminPermissions[key];
                delete AdminPermissions["131072"];
            }
            if(key == "268435456")
            {
                AdminPermissions["ManageRoles"] = AdminPermissions[key];
                delete AdminPermissions["268435456"];
            }
            if(key == "536870912")
            {
                AdminPermissions["ManageWebhooks"] = AdminPermissions[key];
                delete AdminPermissions["536870912"];
            }
            if(key == "17179869184")
            {
                AdminPermissions["ManageThreads"] = AdminPermissions[key];
                delete AdminPermissions["17179869184"];
            }
            if(key == "68719476736")
            {
                AdminPermissions["CreatePrivateThreads"] = AdminPermissions[key];
                delete AdminPermissions["68719476736"];
            }
        }
        if(Server.TICKETS.PERMISSIONS.ADMINS && Array.isArray(Server.TICKETS.PERMISSIONS.ADMINS) && Array(Server.TICKETS.PERMISSIONS.ADMINS).length != 0)
        {
            Server.TICKETS.PERMISSIONS.ADMINS.forEach(Admin =>
            {
                Channel.permissionOverwrites.create(Admin, AdminPermissions);
            });
        }
        Tickets.create
        (
            {
                SERVER: Interaction.guild.id,
                COUNT: Server.TICKETS.COUNT+1,
                CHANNEL: Channel.id,
                CREATOR: Creator.id,
                OPEN: true
            },
            function(err, res)
            {
                if(err) console.log(err);
                console.log(res);
            }
        );
        Servers.findOneAndUpdate
        (
            {
                SERVER: Interaction.guild.id
            },
            {
                $set:
                {
                    "TICKETS.COUNT": Server.TICKETS.COUNT+1
                }
            },
            function(err, res)
            {
                if(err) console.log(err);
                console.log(res);
            }
        );
        Channel.send({ content: `<@${Interaction.user.id}>`, allowedMentions: { users: [Interaction.user.id] } }).then(async (Message) => { setTimeout(function(){ Message.delete(); }, 1000); });
        return Interaction.reply({ content: `The ticket was created, <#${Channel.id}>`, ephemeral: true });
    });
}