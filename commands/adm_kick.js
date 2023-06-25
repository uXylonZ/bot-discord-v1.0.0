const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('[ Administração ] Kicke um usuário.')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Qual usuário?')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('motivo')
                .setDescription('Qual o motivo?')
                .setRequired(false)),
    async execute(client, interaction) {

        let sem_perm = new Discord.EmbedBuilder()
            .setDescription(`🚫 | Não tens permissão para utilizar este comando!`)
            .setColor("Red");

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ embeds: [sem_perm], ephemeral: true }).then(() => {
                setTimeout(() => {
                    interaction.deleteReply()
                }, 8000);
            })
        } else {

            const membro = interaction.options.getUser("usuario")
            const user = interaction.guild.members.cache.get(membro.id)
            const motivo = interaction.options.getString("motivo")

            if (!motivo) motivo = "Não informado."

            let embed = new Discord.EmbedBuilder()
                .setDescription(`
O ${user} (\`${user.id}\`) foi kickado do servidor com sucesso.

> Motivo: \`${motivo}\`.
                `)
                .setColor('Green')
            user.kick(motivo).then(() => {
                interaction.reply({ embeds: [embed], ephemeral: true }).then(() => {
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 8000);
                })
            }).catch(e => {
                if (e.code === 50013) {
                    let embed = new Discord.EmbedBuilder()
                        .setDescription(`Não consigo kickar o ${user} (\`${user.id}\`) pois ele é do mesmo cargo ou superior a mim.`)
                        .setColor('Red')
                    interaction.reply({ embeds: [embed], ephemeral: true }).then(() => {
                        setTimeout(() => {
                            interaction.deleteReply()
                        }, 8000);
                    })
                } else {
                    let embed = new Discord.EmbedBuilder()
                        .setDescription(`Ocorreu algum erro imprevisto.`)
                        .setColor('Red')
                    interaction.reply({ embeds: [embed], ephemeral: true }).then(() => {
                        setTimeout(() => {
                            interaction.deleteReply()
                        }, 8000);
                    })
                }
            })

        }
    }
}