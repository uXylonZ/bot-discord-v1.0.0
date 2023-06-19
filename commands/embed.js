const { SlashCommandBuilder } = require('@discordjs/builders');
const { TextInputStyle } = require(`discord.js`)
const { InteractionType } = require(`discord.js`)
const Discord = require(`discord.js`);
const moment = require("moment")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('「 Administração 」Cria uma embed.')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Mencione um canal.')
                .setRequired(false)
                .addChannelTypes(Discord.ChannelType.GuildText)),

    async execute(client, interaction) {

        let sem_perm = new Discord.EmbedBuilder()
            .setDescription(`🚫 | Você não tem permissão para utilizar este comando!`)
            .setColor("Red")

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ embeds: [sem_perm], ephemeral: true }).then(() => {
                setTimeout(() => {
                    interaction.deleteReply()
                }, 8000);
            })
        }

        const modal = new Discord.ModalBuilder()
            .setCustomId(`Embed`)
            .setTitle(`Crie sua embed!`)
        const TítuloEmbed = new Discord.TextInputBuilder()
            .setCustomId(`TítuloEmbed`)
            .setLabel(`Título da Embed`)
            .setPlaceholder(`Insira o título da Embed.`)
            .setStyle(TextInputStyle.Short)
        const DescriçãoEmbed = new Discord.TextInputBuilder()
            .setCustomId(`DescriçãoEmbed`)
            .setLabel(`Descrição da Embed`)
            .setPlaceholder(`Insira a descrição da Embed`)
            .setStyle(TextInputStyle.Paragraph)

        const PrimeiraActionRow = new Discord.ActionRowBuilder().addComponents(TítuloEmbed);
        const SegundaActionRow = new Discord.ActionRowBuilder().addComponents(DescriçãoEmbed);

        let canal = interaction.options.getChannel("canal") || interaction.channel
        modal.addComponents(PrimeiraActionRow, SegundaActionRow)
        await interaction.showModal(modal);

        client.once(`interactionCreate`, async interaction => {
            if (!interaction.isModalSubmit()) return;
            if (interaction.customId === `Embed`) {

                const DescriçãoEmbed = interaction.fields.getTextInputValue(`DescriçãoEmbed`);
                const TítuloEmbed = interaction.fields.getTextInputValue(`TítuloEmbed`);

                let embedModal1 = new Discord.EmbedBuilder()
                    // .setAuthor({ name: ``, iconURL: '' })
                    .setFooter({ text: `${moment(interaction.createdTimestamp).format("D/MM/YYYY [às] HH:mm")}`})
                    .setColor(`2B2D31`)
                    .setTitle(`${TítuloEmbed}`)
                    .setDescription(`${DescriçãoEmbed}`)
                    

                let modal = new Discord.EmbedBuilder()
                    .setDescription(`✅ | **Novo serviço enviado com sucesso.**!`)
                    .setColor("Green");
                interaction.reply({ embeds: [modal], ephemeral: true }).then(() => {
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 8000);
                })

                canal.send({ embeds: [embedModal1] }).catch((e) => {
                    let erro = new Discord.EmbedBuilder()
                        .setDescription(`❌ | **Algo deu errado, por favor tente novamente...**!`)
                        .setColor("Red");
                    interaction.reply({ embeds: [erro], ephemeral: true }).then(() => {
                        setTimeout(() => {
                            interaction.deleteReply()
                        }, 8000);
                    })
                })
            }
        });
    }
}