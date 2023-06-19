const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const moment = require("moment")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('[ Geral ] Mostra o seu avatar.')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Qual usuário?')
                .setRequired(false)),
    async execute(client, interaction) {

        let usuario = interaction.options.getUser("usuario") || interaction.user
        let avatar = usuario.displayAvatarURL({ dynamic: true, size: 4096 }).replace('.webp', '.png').replace('.webm', '.gif');

        let embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Avatar de ${usuario.username}`, iconURL: usuario.displayAvatarURL({ dynamic: true }) })
        .setImage(avatar)
        .setFooter({ text: `Comando usado às ${moment(interaction.createdTimestamp).format("HH:mm [no dia] D/MM")}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setColor("Aqua")

        const botao = new Discord.ButtonBuilder()
            .setLabel('📥 | Download')
            .setURL(avatar) 
            .setStyle(Discord.ButtonStyle.Link); 

        const botoes = new Discord.ActionRowBuilder()
            .addComponents(botao);

        await interaction.reply({ embeds: [embed], components: [botoes] });

    }
}