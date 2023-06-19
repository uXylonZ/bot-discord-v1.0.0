const discordTranscripts = require('discord-html-transcripts');
const { QuickDB } = require('quick.db')
const db = new QuickDB;
const Discord = require("discord.js")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (interaction.isSelectMenu()) {
            if (interaction.customId === "painel_ticket") {
                let opc = interaction.values[0];
                let categoria = "1015004882232688720";
                if (!interaction.guild.channels.cache.get(categoria)) categoria == null;
                if (opc === "candi") {
                    let nome = `candidatura-${interaction.user.username}`;
                    if (interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)) {
                        let aberto = new Discord.EmbedBuilder()
                            .setDescription(`Você já possui um ticket aberto! ${interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)}`)
                            .setColor("2F3136");
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
                                .setColor("2F3136");
                            interaction.reply({ embeds: [canal], ephemeral: true }).then(() => {
                                setTimeout(() => {
                                    interaction.deleteReply()
                                }, 8000);
                            })
                            let embed = new Discord.EmbedBuilder()
                                .setTitle(`Olá querido(a) ${interaction.user.username}`)
                                .setDescription(`Bem-vindo(a) à nossa central de atendimento, peço que explique detalhadamente o que você precisa.\n\n👥・\`Jogador\`: ${interaction.user}\n📕・\`Motivo\`: **Candidaturas/Recrutamento**\n\n**Assim que terminar o seu atendimento feche o ticket.**`)
                                .setColor("2F3136");
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

                } else if (opc === "reuni") {
                    let nome = `reunião-${interaction.user.username}`;
                    if (interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)) {
                        let aberto = new Discord.EmbedBuilder()
                            .setDescription(`Você já possui um ticket aberto! ${interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)}`)
                            .setColor("2F3136");
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
                                .setColor("2F3136");
                            interaction.reply({ embeds: [canal], ephemeral: true }).then(() => {
                                setTimeout(() => {
                                    interaction.deleteReply()
                                }, 8000);
                            })
                            let embed = new Discord.EmbedBuilder()
                                .setTitle(`Olá querido(a) ${interaction.user.username}`)
                                .setDescription(`Bem-vindo(a) à nossa central de atendimento, peço que explique detalhadamente o que você precisa.\n\n👥・\`Jogador\`: ${interaction.user}\n📕・\`Motivo\`: **Reuniões/Parcerias**\n\n**Assim que terminar o seu atendimento feche o ticket.**`)
                                .setColor("2F3136");
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
                } else if (opc === "porte") {
                    let nome = `porte-${interaction.user.username}`;
                    if (interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)) {
                        let aberto = new Discord.EmbedBuilder()
                            .setDescription(`Você já possui um ticket aberto! ${interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)}`)
                            .setColor("2F3136");
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
                                .setColor("2F3136");
                            interaction.reply({ embeds: [canal], ephemeral: true }).then(() => {
                                setTimeout(() => {
                                    interaction.deleteReply()
                                }, 8000);
                            })
                            let embed = new Discord.EmbedBuilder()
                                .setTitle(`Olá querido(a) ${interaction.user.username}`)
                                .setDescription(`Bem-vindo(a) à nossa central de atendimento, peço que explique detalhadamente o que você precisa.\n\n👥・\`Jogador\`: ${interaction.user}\n📕📕・\`Motivo\`: **Porte de Arma**\n\n**Assim que terminar o seu atendimento feche o ticket.**`)
                                .setColor("2F3136");
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
                } else if (opc === "lince") {
                    let nome = `caça-${interaction.user.username}`;
                    if (interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)) {
                        let aberto = new Discord.EmbedBuilder()
                            .setDescription(`Você já possui um ticket aberto! ${interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)}`)
                            .setColor("2F3136");
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
                                .setColor("2F3136");
                            interaction.reply({ embeds: [canal], ephemeral: true }).then(() => {
                                setTimeout(() => {
                                    interaction.deleteReply()
                                }, 8000);
                            })
                            let embed = new Discord.EmbedBuilder()
                                .setTitle(`Olá querido(a) ${interaction.user.username}`)
                                .setDescription(`Bem-vindo(a) à nossa central de atendimento, peço que explique detalhadamente o que você precisa.\n\n👥・\`Jogador\`: ${interaction.user}\n📕・\`Motivo\`: **Lincença de Caça**\n\n**Assim que terminar o seu atendimento feche o ticket.**`)
                                .setColor("2F3136");
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
                } else if (opc === "duvid") {
                    let nome = `dúvida-${interaction.user.username}`;
                    if (interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)) {
                        let aberto = new Discord.EmbedBuilder()
                            .setDescription(`Você já possui um ticket aberto! ${interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)}`)
                            .setColor("2F3136");
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
                                .setColor("2F3136");
                            interaction.reply({ embeds: [canal], ephemeral: true }).then(() => {
                                setTimeout(() => {
                                    interaction.deleteReply()
                                }, 8000);
                            })
                            let embed = new Discord.EmbedBuilder()
                                .setTitle(`Olá querido(a) ${interaction.user.username}`)
                                .setDescription(`Bem-vindo(a) à nossa central de atendimento, peço que explique detalhadamente o que você precisa.\n\n👥・\`Jogador\`: ${interaction.user}\n📕・\`Motivo\`: **Dúvidas/Denúncias**\n\n**Assim que terminar o seu atendimento feche o ticket.**`)
                                .setColor("2F3136");
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
                } else if (opc === "outro") {
                    let nome = `outros-${interaction.user.username}`;
                    if (interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)) {
                        let aberto = new Discord.EmbedBuilder()
                            .setDescription(`Você já possui um ticket aberto! ${interaction.guild.channels.cache.find(c => c.topic == `Ticket de ${interaction.user.username}.`)}`)
                            .setColor("2F3136");
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
                                .setColor("2F3136");
                            interaction.reply({ embeds: [canal], ephemeral: true }).then(() => {
                                setTimeout(() => {
                                    interaction.deleteReply()
                                }, 8000);
                            })
                            let embed = new Discord.EmbedBuilder()
                                .setTitle(`Olá querido(a) ${interaction.user.username}`)
                                .setDescription(`Bem-vindo(a) à nossa central de atendimento, peço que explique detalhadamente o que você precisa.\n\n👥・\`Jogador\`: ${interaction.user}\n📕・\`Motivo\`: **Outros Assuntos**\n\n**Assim que terminar o seu atendimento feche o ticket.**`)
                                .setColor("2F3136");
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
        } else if (interaction.isButton()) {
            if (interaction.customId === "fechar_ticket") {
                let fechando = new Discord.EmbedBuilder()
                    .setDescription(`Olá, ${interaction.user}, este ticket será excluido em 5 segundos...`)
                    .setColor("2F3136");
                interaction.reply({ embeds: [fechando] })

                let channel = interaction.channel;
                const attachment = await discordTranscripts.createTranscript(channel, {
                    fileName: `${channel.name}.html`,
                });
                let embedLog = new Discord.EmbedBuilder()
                    .setColor('Red')
                    .setDescription(`*Ticket fechado, informações:* \n**(Transcripts Anexados)**\n`)
                    .setTimestamp()
                    .setFooter({ text: `Ticket fechado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                await interaction.guild.channels.cache.get("946877430205931530").send({ content: `💾 - Transcript `, files: [attachment], embeds: [embedLog] })

                setTimeout(() => {
                    try {
                        interaction.channel.delete().catch(e => { return; })
                    } catch (e) {
                        return;
                    }
                }, 5000)
            }
        }
    }
}