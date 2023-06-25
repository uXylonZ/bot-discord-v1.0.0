const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const moment = require("moment")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('painel-verificar')
        .setDescription('[ Administração ] Painel de Verificação.')
        .addRoleOption(option =>
            option.setName('cargo')
                .setDescription('Qual cargo será o de verificado?')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Qual seria o canal de verificação?')
                .addChannelTypes(Discord.ChannelType.GuildText)
                .setRequired(false)),

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

            let cargo = interaction.options.getRole("cargo")
            let canal = interaction.options.getChannel("canal") || interaction.channel
            await db.set(`cargo_verificacao_${interaction.guild.id}`, cargo.id)

            let embed = new Discord.EmbedBuilder()
                .setColor('Green')
                .setDescription(`
# Painel de Verificação
### Temos 2 métodos para te verificares aqui no servidor, sendo elas:
        
1 - Clicar no Botão abaixo ("Verificar");
2 - No #comandos usar ("/captcha").
                `)
                .setFooter({ text: `Comando usado ${moment(interaction.createdTimestamp).format("[às] HH:mm")}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

            const botao = new Discord.ButtonBuilder()
                .setCustomId('botao')
                .setLabel('Verificar')
                .setStyle(Discord.ButtonStyle.Primary);

            const botoes = new Discord.ActionRowBuilder()
                .addComponents(botao);

            let embed1 = new Discord.EmbedBuilder()
                .setColor('Green')
                .setDescription(`✅ | Painel de Verificação enviado para ${canal} e o cargo de verificado é (${cargo})!`)

            interaction.reply({ embeds: [embed1], ephemeral: true }).then(() => {
                setTimeout(() => {
                    interaction.deleteReply()
                }, 8000);
            })

            canal.send({ embeds: [embed], components: [botoes] })

        }
    }
}