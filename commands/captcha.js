const { SlashCommandBuilder } = require('@discordjs/builders');
const { TextInputStyle } = require(`discord.js`)
const Discord = require("discord.js");
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const config = require("../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('captcha')
        .setDescription('[ Geral ] Faça seu captcha.'),

    async execute(client, interaction) {

        const caracteres = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0';
        let codigo = '';
        for (let i = 0; i < 6; i++) {
            codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        await db.set(`codigo_${interaction.user.id}`, codigo)

        const modal = new Discord.ModalBuilder()
            .setCustomId(`captcha`)
            .setTitle(`${codigo}`)
        const TítuloEmbed = new Discord.TextInputBuilder()
            .setCustomId(`Codigo`)
            .setLabel(`O seu código está no titúlo`)
            .setPlaceholder(`O seu código está no titúlo`)
            .setStyle(TextInputStyle.Short)

        const PrimeiraActionRow = new Discord.ActionRowBuilder().addComponents(TítuloEmbed);

        modal.addComponents(PrimeiraActionRow)
        await interaction.showModal(modal);

        client.once(`interactionCreate`, async interaction => {
            if (!interaction.isModalSubmit()) return;
            if (interaction.customId === `captcha`) {
                let codigo1 = await db.get(`codigo_${interaction.user.id}`)
                let codigo2 = interaction.fields.getTextInputValue(`Codigo`);
                let canal = interaction.channel
                if (codigo2 === codigo1) {
                    let embed = new Discord.EmbedBuilder()
                        .setDescription(`**Parabéns ${interaction.user}! Acabas-te de te verificar!**`)
                        .setColor('Green');
                    interaction.reply({ content: ".", ephemeral: true }).then(() => {
                        setTimeout(() => {
                            interaction.deleteReply()
                        }, 200);
                    })
                    canal.send({ embeds: [embed] }).then((a) => {
                        setTimeout(() => {
                            a.delete()
                        }, 8000);
                    })
                    let member = await interaction.guild.members.fetch(interaction.user.id);
                    let cargo = interaction.guild.roles.cache.get(config.cargo_verificacao)
                    member.roles.add(cargo)
                } else {
                    let embed = new Discord.EmbedBuilder()
                        .setDescription(`**Ops ${interaction.user}! Erras-te o código!**`)
                        .setColor('Red');
                    interaction.reply({ content: ".", ephemeral: true }).then(() => {
                        setTimeout(() => {
                            interaction.deleteReply()
                        }, 200);
                    })
                    canal.send({ embeds: [embed] }).then((a) => {
                        setTimeout(() => {
                            a.delete()
                        }, 8000);
                    })
                }
            }
        })
    }
}