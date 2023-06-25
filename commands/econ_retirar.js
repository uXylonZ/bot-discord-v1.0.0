const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('retirar')
        .setDescription('[ Economia ] Retire dinheiro do seu banco para a sua carteira.')
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('Qual a quantidade que deseja retirar?')
                .setRequired(true)),
    async execute(client, interaction) {

        const quantidade = interaction.options.getInteger("quantidade")
        const banco = await db.get(`banco_${interaction.user.id}`)
        if (quantidade < 1) {
            let embed = new Discord.EmbedBuilder()
                .setDescription(`
# ❌ Quantidade inválida

A quantidade que tentou depositar (**__${quantidade}€__**) precisa de ser positiva **(maior que 1)**!
            `)
                .setColor("Red")
            interaction.reply({ embeds: [embed], ephemeral: true })
        } else {
            if (quantidade > banco) {
                let embed = new Discord.EmbedBuilder()
                    .setDescription(`
# ❌ Sem dinheiro
    
A quantidade que tentou sacar (**__${quantidade}€__**) é maior do que a que você têm no banco!
    
Total de dinheiro no **BANCO**:
> **__${banco}€__**
                `)
                    .setColor("Red")
                interaction.reply({ embeds: [embed], ephemeral: true })
            } else {
                await db.sub(`banco_${interaction.user.id}`, quantidade)
                await db.add(`carteira_${interaction.user.id}`, quantidade)
                let carteira1 = await db.get(`carteira_${interaction.user.id}`)
                let banco1 = await db.get(`banco_${interaction.user.id}`)
                let embed = new Discord.EmbedBuilder()
                    .setDescription(`
# 💸 Dinheiro retirado
    
Acabou de retirar **__${quantidade}__** do seu banco para sua carteira.
    
🏧 Total de dinheiro no **BANCO**:
> **__${banco1}€__**
    
💳 Total de dinheiro na **CARTEIRA**:
> **__${carteira1}€__**
                `)
                    .setColor("Green")
                interaction.reply({ embeds: [embed] })
            }
        }
    }
}