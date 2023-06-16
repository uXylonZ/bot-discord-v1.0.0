const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verificar')
        .setDescription('[ Administração ] Painel de Verificação.'),

    async execute(client, interaction) {

        let sem_perm = new Discord.EmbedBuilder()
            .setDescription(`🚫 | Não tens permissão para utilizar este comando!`)
            .setColor("Red");

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ embeds: [sem_perm], ephemeral: true }).then(() => {
                setTimeout(() => {
                    interaction.deleteReply()
                }, 8000);
            })
        } else {

        let embed = new Discord.EmbedBuilder()
        .setColor('Green')
        .setDescription('**Para te verificares basta apertares no botão abaixo!**');

        const botao = new Discord.ButtonBuilder()
        .setCustomId('botao')
        .setLabel('Verificar')
        .setStyle(Discord.ButtonStyle.Primary); 

        const botoes = new Discord.ActionRowBuilder()
        .addComponents(botao);

        let canal = interaction.channel

        interaction.reply({ content: '.', ephemeral: true }).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 100);
        })

        canal.send({ embeds: [embed], components: [botoes] })

        }
    }
}