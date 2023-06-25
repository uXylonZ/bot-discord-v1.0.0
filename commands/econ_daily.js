const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const { ms } = require("tech-tip-cyber")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('[ Economia ] Pegue seu dinheiro diário.'),
    async execute(client, interaction) {

        let cooldown = 86400000
        let daily = await db.get(`daily_${interaction.user.id}`)
        if (daily !== null && cooldown - (Date.now() - daily) > 0) {
            let tempo = ms(cooldown - (Date.now() - daily))

            let embed = new Discord.EmbedBuilder()
                .setDescription(`
# ❌ Daily já resgatado

Espere **${tempo.hours} horas, ${tempo.minutes} minutos, ${tempo.seconds} segundos** para poder resgatar seu daily novamente!
                `)
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .setColor("Red")
            interaction.reply({ embeds: [embed], ephemeral: true })

        } else {
            let quantia = Math.ceil(Math.random() * 1000)
            if (quantia < 10) quantia = quantia + 10
            await db.add(`banco_${interaction.user.id}`, quantia)
            await db.set(`daily_${interaction.user.id}`, Date.now())

            let embed1 = new Discord.EmbedBuilder()
                .setDescription(`
# 💸 Daily resgatado

Você recebeu **__${quantia}€__** em seu /daily. Volte daqui a 24 horas!

> Utilize o \`/banco\` para ver o seu total de dinheiro.
                `)
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .setColor("Green")
            interaction.reply({ embeds: [embed1] })
        }
    }
}