const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('depositar')
        .setDescription('[ Economia ] Deposite dinheiro da sua carteira para o seu banco.')
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('Qual a quantidade que deseja depositar?')
                .setRequired(true)),
    async execute(client, interaction) {

        const quantidade = interaction.options.getInteger("quantidade")
        const carteira = await db.get(`carteira_${interaction.user.id}`)
        if (quantidade < 1) {
            let embed = new Discord.EmbedBuilder()
                .setDescription(`
# ❌ Quantidade inválida

A quantidade que tentou depositar (**__${quantidade}€__**) precisa de ser positiva **(maior que 1)**!
            `)
                .setColor("Red")
            interaction.reply({ embeds: [embed], ephemeral: true })
        } else {
            if (quantidade > carteira) {
                let embed = new Discord.EmbedBuilder()
                    .setDescription(`
# ❌ Sem dinheiro
    
A quantidade que tentou depositar (**__${quantidade}€__**) é maior do que a que você têm na carteira!
    
Total de dinheiro na **CARTEIRA**:
> **__${carteira}€__**
                `)
                    .setColor("Red")
                interaction.reply({ embeds: [embed], ephemeral: true })
            } else {
                await db.sub(`carteira_${interaction.user.id}`, quantidade)
                await db.add(`banco_${interaction.user.id}`, quantidade)
                let carteira1 = await db.get(`carteira_${interaction.user.id}`)
                let banco1 = await db.get(`banco_${interaction.user.id}`)
                let embed = new Discord.EmbedBuilder()
                    .setDescription(`
# 💸 Dinheiro depositado
    
Acabou de depositar **__${quantidade}__** da sua carteira para o seu banco.
    
🏧 Total de dinheiro no **BANCO**:
> **__${banco1}€__**
    
💳 Total de dinheiro no **CARTEIRA**:
> **__${carteira1}€__**
                `)
                    .setColor("Green")
                interaction.reply({ embeds: [embed] })
            }

        }
    }
}