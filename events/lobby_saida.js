const Discord = require("discord.js")

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        
        let canal_logs = "1122275283106533446"
        if (!canal_logs) {
            return
        } else {
            let embed = new Discord.EmbedBuilder()
            .setDescription(`
# Até um dia ${member.user.username}
            
O ${member.user.username} (\`${member.id}\`) saiu do servidor!
            
😓 Espero que um dia retorne.

Agora somos apenas \`${member.guild.memberCount}\` membros.
            `)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) })
            .setColor("Red")

            member.guild.channels.cache.get(canal_logs).send({ embeds: [embed] })
        }
    }
}
