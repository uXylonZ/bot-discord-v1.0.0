const { SlashCommandBuilder } = require('@discordjs/builders');
const { TextInputStyle } = require(`discord.js`)
const Discord = require("discord.js");
const moment = require("moment")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('elogiar')
        .setDescription('「 Utilidade 」Elogie alguém.')
        .addUserOption(option =>
            option.setName('agente')
                .setDescription('Qual o Agente?')
                .setRequired(true)),

    async execute(client, interaction) {

        let canal = interaction.guild.channels.cache.get("1066088742826229930") || interaction.channel
        if (!canal) {
            let sem_canal = new Discord.EmbedBuilder()
                .setDescription(`Olá ${interaction.user}, o canal de sugestões ainda não foi configurado!`)
                .setColor("Red");
            interaction.reply({ embeds: [sem_canal], ephemeral: true }).then(() => {
                setTimeout(() => {
                    interaction.deleteReply()
                }, 8000);
            })
        } else {
            const modal = new Discord.ModalBuilder()
                .setCustomId(`elogiar`)
                .setTitle(`Elogie alguém!`)
            const TítuloEmbed = new Discord.TextInputBuilder()
                .setCustomId(`TítuloEmbed`)
                .setLabel(`Teu elogio?`)
                .setPlaceholder(`Simplesmente o melhor PSP.`)
                .setStyle(TextInputStyle.Paragraph)

            const PrimeiraActionRow = new Discord.ActionRowBuilder().addComponents(TítuloEmbed);

            modal.addComponents(PrimeiraActionRow)
            await interaction.showModal(modal);
            let User = interaction.options.getUser("agente");

            client.once(`interactionCreate`, async interaction => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === `elogiar`) {
                    
                    const elogio = interaction.fields.getTextInputValue(`TítuloEmbed`);
                    let embed = new Discord.EmbedBuilder()
                        .setDescription(`**Elogio de:**\n⤷ ${interaction.user}\n\n**Agente:**\n⤷ ${User}\n\n**Elogio:**\n\`\`\`${elogio}\`\`\``)
                        .setThumbnail(interaction.user.displayAvatarURL({ dinamyc: true, size: 4096 }))
                        .setAuthor({ name: `Polícia de Segurança Pública - Elogios`, iconURL: 'https://media.discordapp.net/attachments/1065728033715142748/1069416105921220638/psp.png' })
                        .setFooter({ text: `PSP • ${moment(interaction.createdTimestamp).format("D/MM/YYYY [às] HH:mm")}`, iconURL: interaction.guild.iconURL({ dynamic: true, size: 4096 }) })
                        .setColor("Blue");

                    canal.send({ embeds: [embed] }).then((a) => {
                        a.react('✅')
                        a.react('❌')
                        let nova_sugestao = new Discord.EmbedBuilder()
                            .setDescription(`Olá ${interaction.user}, o teu elogio foi publicado com sucesso.`)
                            .setColor("Blue");
                        interaction.reply({ embeds: [nova_sugestao], ephemeral: true }).then(() => {
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
}