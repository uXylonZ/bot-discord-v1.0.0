const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const moment = require("moment")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sugerir')
        .setDescription('[ Geral ] Faça uma sugestão.'),
    async execute(client, interaction) {

        let canal = interaction.guild.channels.cache.get("1048357074419064922") || interaction.channel

        const modal = new Discord.ModalBuilder()
            .setCustomId(`sugerir`)
            .setTitle(`Faça sua sugestão!`)
        const sugestao = new Discord.TextInputBuilder()
            .setCustomId(`sugestao`)
            .setLabel(`Sua sugestão`)
            .setPlaceholder(`Qual é a sua sugestão?`)
            .setStyle(Discord.TextInputStyle.Paragraph)

        const sugestao1 = new Discord.ActionRowBuilder().addComponents(sugestao);

        modal.addComponents(sugestao1)
        await interaction.showModal(modal);

        client.once(`interactionCreate`, async interaction => {

            if (!interaction.isModalSubmit()) return;
            if (interaction.customId === `sugerir`) {
                const sugestao = interaction.fields.getTextInputValue(`sugestao`);
                let embed = new Discord.EmbedBuilder()
                    .setAuthor({ name: `❗ NOVA SUGESTÃO ❗`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setFooter({ text: `Comando usado: ${moment(interaction.createdTimestamp).format("D/MM [às] HH:mm")}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(`**➜ Autor:**
${interaction.user}
        
**➜ Sugestão:**
\`\`\`${sugestao}\`\`\``)
                    .setColor("Aqua")

                canal.send({ embeds: [embed] }).then((a) => {
                    a.react('✅')
                    a.react('❌')
                    let embed1 = new Discord.EmbedBuilder()
                        .setDescription(`Olá **${interaction.user.username}**, a sua sugestão foi enviada para ${canal} com sucesso.`)
                        .setColor("Green")

                    interaction.reply({ embeds: [embed1], ephemeral: true })
                }).catch(() => {
                    let embed2 = new Discord.EmbedBuilder()
                        .setDescription(`Ops, algo deu errado!`)
                        .setColor("Red")

                    interaction.reply({ embeds: [embed2], ephemeral: true })
                })
            }
        })
    }
}