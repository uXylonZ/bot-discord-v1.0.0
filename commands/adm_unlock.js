const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('[ Administração ] Desbloqueie um canal.')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Qual canal para desbloquear?')
                .addChannelTypes(Discord.ChannelType.GuildText)
                .setRequired(false)),
    async execute(client, interaction) {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            let sem_perm = new Discord.EmbedBuilder()
                .setDescription(`🚫 | Você não tem permissão para utilizar este comando!`)
                .setColor("Red");
            interaction.reply({ embeds: [sem_perm], ephemeral: true }).then(() => {
                setTimeout(() => {
                    interaction.deleteReply()
                }, 8000);
            })
        } else {

            let canal1 = interaction.options.getChannel("canal") || interaction.channel
            let canal = interaction.guild.channels.cache.get(canal1.id)
            let permissaoEnviarMensagens = canal.permissionsFor(interaction.guild.roles.everyone);

            if (!permissaoEnviarMensagens.has(Discord.PermissionFlagsBits.SendMessages)) {
                canal.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true }).then(() => {
                    let embed = new Discord.EmbedBuilder()
                    .setDescription(`🔓 | O canal de texto ${canal} foi desbloqueado!`)
                    .setColor("Green");
                interaction.reply({ embeds: [embed], ephemeral: true }).then(() => {
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 8000);
                    let embed = new Discord.EmbedBuilder()
                        .setDescription(`🔓 Este canal foi desbloqueado por **${interaction.user}**!`)
                        .setColor("Green");
                    canal.send({ embeds: [embed] })
                })
                }).catch(e => {
                    let embed = new Discord.EmbedBuilder()
                        .setDescription(`❌ | Algo deu errado!`)
                        .setColor("Red");
                    interaction.reply({ embeds: [embed], ephemeral: true }).then(() => {
                        setTimeout(() => {
                            interaction.deleteReply()
                        }, 8000);
                    })
                })
            } else {
                let embed = new Discord.EmbedBuilder()
                    .setDescription(`❌ | O canal já está desbloqueado`)
                    .setColor("Red");
                interaction.reply({ embeds: [embed], ephemeral: true }).then(() => {
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 8000);
                })
            }
        }
    }
}