const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('[ Administração ] Abra o painel de Tickets.'),

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
                        value: "candi"
                    }, {
                        emoji: "2️⃣",
                        label: "2",
                        description: "2",
                        value: "reuni"
                    }, {
                        emoji: "3️⃣",
                        label: "3",
                        description: "3",
                        value: "porte"
                    }, {
                        emoji: "4️⃣",
                        label: "4",
                        description: "4",
                        value: "lince"
                    }, {
                        emoji: "5️⃣",
                        label: "5",
                        description: "5",
                        value: "duvid"
                    }, {
                        emoji: "6️⃣",
                        label: "6",
                        description: "6",
                        value: "outro"
                    }));

            let msg_enviada = new Discord.EmbedBuilder()
                .setDescription(`✅ | O painel de tickets foi enviado com sucesso.`)
                .setColor("Green");
            interaction.reply({ content: `${interaction.user}`, embeds: [msg_enviada], ephemeral: true }).then(() => {
                setTimeout(() => {
                    interaction.deleteReply()
                }, 8000);
            })
            interaction.channel.send({ embeds: [embed], components: [painel] })

        }
    }
}