const Discord = require("discord.js")

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        
        let canal_logs = "1122275270519443537"
        if (!canal_logs) {
            return
        } else {
            let embed = new Discord.EmbedBuilder()
            .setDescription(`
# 👋 Boas Vindas 👋

Olá ${member} (\`${member.id}\`)!
Seja muito Bem-Vindo ao servidor **${member.guild.name}**.
            
Graças a você agora somos \`${member.guild.memberCount}\` membros.
            `)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) })
            .setColor("Green")

            member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` })
        }
    }
}
