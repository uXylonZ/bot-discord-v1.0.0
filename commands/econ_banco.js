const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banco')
        .setDescription('[ Economia ] Veja quanto dinheiro você têm.')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Quer ver o banco de qual usuário?')
                .setRequired(false)),
    async execute(client, interaction) {

        let usuario = interaction.options.getUser("usuario") || interaction.user

        let carteira = await db.get(`carteira_${usuario.id}`)
        if (carteira === null || carteira === false) carteira = 0

        let banco = await db.get(`banco_${usuario.id}`)
        if (banco === null || banco === false) banco = 0

        let total = banco + carteira
        if (total === null || total === false) total = 0

        if (usuario.id === interaction.user.id) {
            let embed = new Discord.EmbedBuilder()
            .setDescription(`
# 💸 Seu Banco

Total de dinheiro no **BANCO**:
> **__${banco}€__**

Total de dinheiro na **CARTEIRA**:
> **__${carteira}€__**

Total de dinheiro:
> **__${total}€__**
            `)
            .setThumbnail(usuario.displayAvatarURL({ dynamic: true }))
            .setColor("Aqua")
            interaction.reply({ embeds: [embed] })
        } else {
            let embed = new Discord.EmbedBuilder()
            .setDescription(`
# 💸 Banco de ${usuario.username}

🏧 Total de dinheiro no **BANCO**:
> **__${banco}€__**

💳 Total de dinheiro na **CARTEIRA**:
> **__${carteira}€__**

💰 Total de dinheiro:
> **__${total}€__**
            `)
            .setThumbnail(usuario.displayAvatarURL({ dynamic: true }))
            .setColor("Yellow")
            interaction.reply({ embeds: [embed] })
        }
    }
}