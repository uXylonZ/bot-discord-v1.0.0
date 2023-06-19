const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const moment = require("moment")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('painel-verificar')
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
        .setDescription(`# Painel de Verificação
        ### Temos 2 métodos para te verificares aqui no servidor, sendo elas:
        
        1 - Clicar no Botão abaixo ("Verificar");
        2 - No #comandos usar ("/captcha").`)
        .setFooter({ text: `Comando usado ${moment(interaction.createdTimestamp).format("[às] HH:mm")}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

        const botao = new Discord.ButtonBuilder()
        .setCustomId('botao')
        .setLabel('Verificar')
        .setStyle(Discord.ButtonStyle.Primary); 

        const botoes = new Discord.ActionRowBuilder()
        .addComponents(botao);

        let canal = interaction.channel

        let embed1 = new Discord.EmbedBuilder()
        .setColor('Green')
        .setDescription(`✅ | Painel de Verificação enviado com sucesso!`)

        interaction.reply({ embeds: [embed1], ephemeral: true }).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 8000);
        })

        canal.send({ embeds: [embed], components: [botoes] })

        }
    }
}