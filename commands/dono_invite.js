const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('[ Owner ] Meu link para me convidar'),
    async execute(client, interaction) {

        let ownerId = config.dono
        let sem_perm = new Discord.EmbedBuilder()
            .setDescription(`🚫 | Você não é o meu dono!`)
            .setColor("Red");

        if (interaction.user.id !== ownerId) {
            interaction.reply({ embeds: [sem_perm], ephemeral: true }).then(() => {
                setTimeout(() => {
                    interaction.deleteReply()
                }, 8000);
            })
        } else {
            let botId = client.user.id
            let embed = new Discord.EmbedBuilder()
            .setDescription(`Clique [aqui](https://discord.com/oauth2/authorize?client_id=${botId}&permissions=8&scope=bot%20applications.commands) para me adicionar.`)
            .setColor("Aqua")
            interaction.reply({ embeds: [embed] })
        }

    }
}