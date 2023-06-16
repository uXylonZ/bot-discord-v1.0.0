const Discord = require("discord.js")
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('[ Geral ] Mostra o meu ping.'),
	async execute(client, interaction) {

		let ping = `${client.ws.ping}`

		if (ping === "-1") {
			ping = "Carregando...";
			let embed = new Discord.EmbedBuilder()
				.setDescription(`🏓 **| O meu ping atual é de: \`${ping}\`**`)
				.setColor('Yellow')
			interaction.reply({ embeds: [embed] })

		} else {
			let embed = new Discord.EmbedBuilder()
				.setDescription(`🏓 **| O meu ping atual é de: \`${ping}ms\`**`)
				.setColor('Yellow')
			interaction.reply({ embeds: [embed] })
		}
	},
};