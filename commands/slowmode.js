const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('[ Administração ] Configure o modo lento de um canal de texto.')
        .addStringOption(option =>
            option.setName('tempo')
                .setDescription('Qual o tempo? (h|m|s)')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Qual o canal?')
                .addChannelTypes(Discord.ChannelType.GuildText)
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

            let t = interaction.options.getString("tempo")
            let canal = interaction.options.getChannel("canal") || interaction.channel
            if (t === "0s") {
                canal.setRateLimitPerUser(0).then(() => {
                    let embed = new Discord.EmbedBuilder()
                        .setDescription(`**O modo lento do ${canal} foi desativado com sucesso.**`)
                        .setColor("Green");
                    let embed1 = new Discord.EmbedBuilder()
                        .setDescription(`**Este canal teve seu modo lento desativado.**`)
                        .setFooter({ text: `Comando usado por: ${interaction.user.username}` })
                        .setColor("Green");
                    interaction.reply({ embeds: [embed], ephemeral: true }).then(() => {
                        setTimeout(() => {
                            interaction.deleteReply()
                        }, 8000);
                    })
                    canal.send({ embeds: [embed1] }).catch(() => {
                        let embed = new Discord.EmbedBuilder()
                            .setDescription(`**Não tenho permissões suficientes.**`)
                            .setColor("Red");
                        interaction.reply({ embeds: [embed], ephemeral: true }).then(() => {
                            setTimeout(() => {
                                interaction.deleteReply()
                            }, 8000);
                        })
                    })
                })
            } else {
                let tempo = ms(t)
                if (!tempo || tempo === false) {
                    let embed = new Discord.EmbedBuilder()
                        .setDescription(`Fornece um tempo válido **(h|m|s)**!
                    
                    Sendo: **h = hora(s) | m = minuto(s) | s = segundo(s)**
                    Exemplo: **5s = 5 segundos.**`)
                        .setColor("Yellow");
                    interaction.reply({ embeds: [embed], ephemeral: true }).then(() => {
                        setTimeout(() => {
                            interaction.deleteReply()
                        }, 8000);
                    })
                } else {
                    if (tempo === "0s") {
                        a
                    } else {
                        canal.setRateLimitPerUser(tempo / 1000).then(() => {
                            let embed = new Discord.EmbedBuilder()
                                .setDescription(`**O modo lento do ${canal} foi alterado com sucesso para \`${t}\`.**`)
                                .setColor("Green");
                            let embed1 = new Discord.EmbedBuilder()
                                .setDescription(`**Este canal teve seu modo lento alterado para \`${t}\`.**`)
                                .setFooter({ text: `Comando usado por: ${interaction.user.username}` })
                                .setColor("Green");
                            interaction.reply({ embeds: [embed], ephemeral: true }).then(() => {
                                setTimeout(() => {
                                    interaction.deleteReply()
                                }, 8000);
                            })
                            canal.send({ embeds: [embed1] }).catch(() => {
                                let embed = new Discord.EmbedBuilder()
                                    .setDescription(`**Não tenho permissões suficientes.**`)
                                    .setColor("Red");
                                interaction.reply({ embeds: [embed], ephemeral: true }).then(() => {
                                    setTimeout(() => {
                                        interaction.deleteReply()
                                    }, 8000);
                                })
                            })
                        })
                    }
                }
            }
        }
    }
}