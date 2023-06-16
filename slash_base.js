const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aaaaaaaa')
        .setDescription('[ A ] AAAAAAAA')
        .addStringOption(option =>
            option.setName('aaaaaaaa')
                .setDescription('AAAAAAAA')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('aaaaaaaa')
                .setDescription('AAAAAAAA')
                .addChannelTypes(Discord.ChannelType.GuildText)
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('aaaaaaaa')
                .setDescription('AAAAAAAA')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('aaaaaaaa')
                .setDescription('AAAAAAAA')
                .setRequired(true))
        .addMentionableOption(option =>
            option.setName('aaaaaaaa')
                .setDescription('AAAAAAAA')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('aaaaaaaa')
                .setDescription('AAAAAAAA')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('aaaaaaaa')
                .setDescription('AAAAAAAA')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('aaaaaaaa')
                .setDescription('AAAAAAAA')
                .setRequired(true))
        .addAttachmentOption(option =>
            option.setName('aaaaaaaa')
                .setDescription('AAAAAAAA')
                .setRequired(true)),
    async execute(client, interaction) {

        let embed = new Discord.EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('AAAAAAAA')
            .setURL('link')
            .setAuthor({ name: 'AAAAAAAA', iconURL: 'link', url: 'link' })
            .setDescription('AAAAAAAA')
            .setThumbnail('link')
            .addFields(
                { name: 'AAAAAAAA', value: 'AAAAAAAA' },
                { name: '\u200B', value: '\u200B' },
                { name: 'AAAAAAAA', value: 'AAAAAAAA', inline: true },
                { name: 'AAAAAAAA', value: 'AAAAAAAA', inline: true },
            )
            .addFields({ name: 'AAAAAAAA', value: 'AAAAAAAA', inline: true })
            .setImage('link')
            .setTimestamp()
            .setFooter({ text: 'AAAAAAAA', iconURL: 'link' });

        const botao = new Discord.ButtonBuilder()
            .setCustomId('AAAAAAAA')
            .setLabel('AAAAAAAA')
            .setURL('link') // Se for link, nao precisa de CustomId
            .setStyle(Discord.ButtonStyle.Danger); // Danger Link Primary Secondary Success

        const botoes = new Discord.ActionRowBuilder()
            .addComponents(botao);

        await interaction.reply({ content: `Teste`, components: [botoes] });

    }
}