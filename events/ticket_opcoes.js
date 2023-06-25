const fs = require("fs")
const { QuickDB } = require('quick.db')
const db = new QuickDB;
const Discord = require("discord.js")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (interaction.isSelectMenu()) {
            if (interaction.customId === "painel_ticket") {
                let opc = interaction.values[0];
                let categoria = "1048379261662277742";
                if (!interaction.guild.channels.cache.get(categoria)) categoria == null;
                if (opc === "opc1") {
                    let nome = `opc1-${interaction.user.username}`;
                    if (interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)) {
                        let aberto = new Discord.EmbedBuilder()
                            .setDescription(`Você já possui um ticket aberto! ${interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)}`)
                            .setColor("Red");
                        interaction.reply({ embeds: [aberto], ephemeral: true }).then(() => {
                            setTimeout(() => {
                                interaction.deleteReply()
                            }, 8000);
                        })
                    } else {
                        interaction.guild.channels.create({
                            name: nome,
                            type: Discord.ChannelType.GuildText,
                            parent: categoria,
                            topic: `Ticket de ${interaction.user.username}.`,
                            permissionOverwrites: [
                                {
                                    id: interaction.guild.id,
                                    deny: [
                                        Discord.PermissionFlagsBits.ViewChannel
                                    ]
                                },
                                {
                                    id: interaction.user.id,
                                    allow: [
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions,
                                    ]
                                }
                            ]
                        }).then((ch) => {
                            let canal = new Discord.EmbedBuilder()
                                .setDescription(`Olá ${interaction.user}, seu ticket foi criado! ${ch}`)
                                .setColor("Green");
                            interaction.reply({ embeds: [canal], ephemeral: true }).then(() => {
                                setTimeout(() => {
                                    interaction.deleteReply()
                                }, 8000);
                            })
                            let embed = new Discord.EmbedBuilder()
                                .setTitle(`Olá querido(a) ${interaction.user.username}`)
                                .setDescription(`
Bem-vindo(a) à nossa central de atendimento, peço que explique detalhadamente o que você precisa.

👥・\`Jogador\`: ${interaction.user}
📕・\`Motivo\`: **Opc1**

**Assim que terminar o seu atendimento feche o ticket.**
`)
                                .setColor("Yellow");
                            let botao = new Discord.ActionRowBuilder().addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId("fechar_ticket")
                                    .setEmoji("🔒")
                                    .setLabel("Fechar")
                                    .setStyle(Discord.ButtonStyle.Danger)
                            );
                            ch.send({ content: `${interaction.user}`, embeds: [embed], components: [botao] }).then((m) => {
                                m.pin()
                            })
                        })
                    }

                } else if (opc === "opc2") {
                    let nome = `opc2-${interaction.user.username}`;
                    if (interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)) {
                        let aberto = new Discord.EmbedBuilder()
                            .setDescription(`Você já possui um ticket aberto! ${interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)}`)
                            .setColor("Red");
                        interaction.reply({ embeds: [aberto], ephemeral: true }).then(() => {
                            setTimeout(() => {
                                interaction.deleteReply()
                            }, 8000);
                        })
                    } else {
                        interaction.guild.channels.create({
                            name: nome,
                            type: Discord.ChannelType.GuildText,
                            parent: categoria,
                            topic: `Ticket de ${interaction.user.username}.`,
                            permissionOverwrites: [
                                {
                                    id: interaction.guild.id,
                                    deny: [
                                        Discord.PermissionFlagsBits.ViewChannel
                                    ]
                                },
                                {
                                    id: interaction.user.id,
                                    allow: [
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions,
                                    ]
                                }
                            ]
                        }).then((ch) => {
                            let canal = new Discord.EmbedBuilder()
                                .setDescription(`Olá ${interaction.user}, seu ticket foi criado! ${ch}`)
                                .setColor("Green");
                            interaction.reply({ embeds: [canal], ephemeral: true }).then(() => {
                                setTimeout(() => {
                                    interaction.deleteReply()
                                }, 8000);
                            })
                            let embed = new Discord.EmbedBuilder()
                                .setTitle(`Olá querido(a) ${interaction.user.username}`)
                                .setDescription(`
Bem-vindo(a) à nossa central de atendimento, peço que explique detalhadamente o que você precisa.

👥・\`Jogador\`: ${interaction.user}
📕・\`Motivo\`: **Opc2**

**Assim que terminar o seu atendimento feche o ticket.**
`)
                                .setColor("Yellow");
                            let botao = new Discord.ActionRowBuilder().addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId("fechar_ticket")
                                    .setEmoji("🔒")
                                    .setLabel("Fechar")
                                    .setStyle(Discord.ButtonStyle.Danger)
                            );
                            ch.send({ content: `${interaction.user}`, embeds: [embed], components: [botao] }).then((m) => {
                                m.pin()
                            })
                        })
                    }
                }
            }
        }
    }
}