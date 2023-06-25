const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('[ Administração ] Abra o painel de Tickets.')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Qual canal?')
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
            let canal = interaction.options.getChannel("canal") || interaction.channel
            let embed = new Discord.EmbedBuilder()
                .setDescription("Sistema de Suporte")
                .setAuthor({ name: "Sistema de Suporte", iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setColor("Yellow");
            let painel = new Discord.ActionRowBuilder().addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId("painel_ticket")
                    .setPlaceholder("Clique para ver as categorias.")
                    .addOptions({
                        emoji: "1️⃣",
                        label: "1",
                        description: "1",
                        value: "opc1"
                    }, {
                        emoji: "2️⃣",
                        label: "2",
                        description: "2",
                        value: "opc2"
                    }));

            let msg_enviada = new Discord.EmbedBuilder()
                .setDescription(`✅ | O painel de tickets foi enviado para ${canal} com sucesso.`)
                .setColor("Green");
            interaction.reply({ content: `${interaction.user}`, embeds: [msg_enviada], ephemeral: true }).then(() => {
                setTimeout(() => {
                    interaction.deleteReply()
                }, 8000);
            })
            canal.send({ embeds: [embed], components: [painel] })

        }
    }
}