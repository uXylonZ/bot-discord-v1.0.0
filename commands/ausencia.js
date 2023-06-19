const { SlashCommandBuilder } = require('@discordjs/builders');
const { TextInputStyle } = require(`discord.js`)
const Discord = require("discord.js");
const moment = require("moment") //  moment(interaction.createdTimestamp).format("D/MM/YYYY [às] HH:mm")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ausencia')
        .setDescription('「 Utilidade 」Faça sua ausência.'),

    async execute(client, interaction) {

        /*
        let canal = interaction.guild.channels.cache.get("1038818704877699214")
        if (!canal) {
            let sem_canal = new Discord.EmbedBuilder()
                .setDescription(`O canal de ausências ainda não foi configurado!`)
                .setColor("Red");
            interaction.reply({ embeds: [sem_canal], ephemeral: true }).then(() => {
                setTimeout(() => {
                    interaction.deleteReply()
                }, 8000);
            })
        } else {
        */
            const modal = new Discord.ModalBuilder()
                .setCustomId(`ausencia`)
                .setTitle(`「 Ausência 」`)
            const tempo = new Discord.TextInputBuilder()
                .setCustomId(`tempo`)
                .setLabel(`Quanto tempo?`)
                .setPlaceholder(`Ex: 27/04 até 01/05`)
                .setStyle(TextInputStyle.Short)
            const motivo = new Discord.TextInputBuilder()
                .setCustomId(`motivo`)
                .setLabel(`Qual o motivo?`)
                .setPlaceholder(`Ex: Férias.`)
                .setStyle(TextInputStyle.Paragraph)
            
            
            const tempoa = new Discord.ActionRowBuilder().addComponents(tempo);
            const motivoa = new Discord.ActionRowBuilder().addComponents(motivo);

            modal.addComponents(tempoa, motivoa);
            await interaction.showModal(modal);

            client.once(`interactionCreate`, async interaction => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === `ausencia`) {
                    const tempo = interaction.fields.getTextInputValue(`tempo`);
                    const motivo = interaction.fields.getTextInputValue(`motivo`);
                    let canal = interaction.channel
                    let membro = interaction.member
                    let embed = new Discord.EmbedBuilder()
                        .setDescription(`**Ausência de:**\n⤷ ${interaction.user}\n\n**Tempo:**\`\`\`${tempo}\`\`\`\n**Motivo:**\n\`\`\`${motivo}\`\`\``)
                        .setThumbnail(interaction.guild.iconURL({ dinamyc: true, size: 4096 }))
                        .setAuthor({ name: `Ausência de: ${membro.nickname}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
                        .setFooter({ text: `Comando usado ${moment(interaction.createdTimestamp).format("[às] HH:mm")}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setColor("Blue");

                    canal.send({ embeds: [embed] }).then((a) => {
                        let ausencia = new Discord.EmbedBuilder()
                            .setDescription(`A tua ausência foi publicada em ${canal} com sucesso.`)
                            .setColor("Green");
                        interaction.reply({ embeds: [ausencia], ephemeral: true }).then(() => {
                            setTimeout(() => {
                                interaction.deleteReply()
                            }, 8000);
                        }).catch(() => {
                            let erro = new Discord.EmbedBuilder()
                                .setDescription(`Ops ${interaction.user}, algo deu errado.`)
                                .setColor("Red");
                            interaction.reply({ embeds: [erro], ephemeral: true }).then(() => {
                                setTimeout(() => {
                                    interaction.deleteReply()
                                }, 8000);
                            })
                        })
                    })
                }
            })
        }
    }
//}