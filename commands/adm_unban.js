const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('[ Administração ] Desbanir um usuário.')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Qual ID do usuário?')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('motivo')
                .setDescription('Qual o motivo?')
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
            let user = interaction.options.getUser("usuario");
            let motivo = interaction.options.getString("motivo");

            if (!motivo) motivo = "Não definido.";
            let embed = new Discord.EmbedBuilder()
                .setDescription(`O ${user} foi desbanido do servidor com sucesso.`)
                .setColor('Green')
            interaction.guild.members.unban(user.id, motivo).then(() => {
                interaction.reply({ embeds: [embed], ephemeral: true }).then(() => {
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 8000);
                })
            }).catch(e => {
                let embed = new Discord.EmbedBuilder()
                    .setDescription(`O usuário não está banido.`)
                    .setColor('Red')
                interaction.reply({ embeds: [embed], ephemeral: true }).then(() => {
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 8000);
                })
            })
        }
    }
}