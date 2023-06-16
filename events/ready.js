const Discord = require("discord.js")
const { ActivityType } = require('discord.js');
require('colors');

module.exports = {
    name: 'ready',
    async execute(client, commands) {

        const guild = client.guilds.cache.get('1047663932388683876');
        const guildName = guild.name;

        let status = [
            `${guildName}`,
            `${guildName}`,
            `${guildName}`,
        ]

        /*        
        ActivityType.Watching - Assistindo
        ActivityType.Streaming - 
        ActivityType.Playing - Jogando
        ActivityType.Listening - Ouvindo
        ActivityType.Custom - 
        ActivityType.Competing - 
        */ 
        let status2 = [ 
            ActivityType.Watching,
            ActivityType.Playing,
            ActivityType.Listening,
        ]
        i = 0
        y = 0

        setInterval(() => {
            client.user.setPresence({ 
                activities: [{ 
                    name: `${status[i++ % status.length]}`, 
                    type: status2[y++ % status2.length]
                }], status: "dnd" }) // Status: 🟢 online | 🟠 idle | 🔴 dnd | ⚫ invisible
        }, 12000);

        console.log(`Estou ligado em `.green + `${client.user.username}`.white + ` e está em `.green + `${client.guilds.cache.size}`.white + ` servidores!\n\n`.green)
    }
}