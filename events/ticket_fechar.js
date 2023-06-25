const fs = require("fs")
const { QuickDB } = require('quick.db')
const db = new QuickDB;
const Discord = require("discord.js")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (interaction.isButton()) {
            if (interaction.customId === "fechar_ticket") {
                let fechando = new Discord.EmbedBuilder()
                    .setDescription(`Olá, ${interaction.user}, este ticket será excluido em 5 segundos...`)
                    .setColor("Yellow");
                interaction.reply({ embeds: [fechando] }).then(() => {
                    setTimeout(() => {
                        let embed = new Discord.EmbedBuilder()
                            .setDescription(`Trancript do canal realizado!`)
                            .setColor("Yellow");
                        interaction.channel.send({ embeds: [embed] })
                    }, 2000)

                    setTimeout(() => {
                        try {
                            interaction.channel.delete().catch(e => { return; })
                        } catch (e) {
                            return;
                        }
                    }, 5000)
                })
                async function generateTranscript(channel) {
                    try {
                        const messages = await channel.messages.fetch({ limit: 100 }); // Obtenha as últimas 100 mensagens do canal

                        let transcript = '';

                        messages.forEach((message) => {
                            if (message.author.id !== client.user.id) { // Ignorar mensagens enviadas pelo bot
                                const timestamp = `[${formatTimestamp(message.createdAt)}]`;
                                const author = message.author.username;
                                const content = message.cleanContent;

                                transcript += `${timestamp} - **${author}**: \`\`\`${content}\`\`\`\n`;
                            }
                        });

                        if (transcript.length === 0) {
                            transcript = `**Não houve nenhum diálogo.**`;
                        }

                        return transcript;
                    } catch (error) {
                        console.error('Erro ao obter mensagens do canal:', error);
                        return null;
                    }
                }
                function formatTimestamp(date) {
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const year = date.getFullYear().toString();

                    return `${hours}:${minutes} - ${day}/${month}/${year}`;
                }
                const channel = interaction.channel
                const transcript = await generateTranscript(channel);

                if (transcript) {
                    const transcriptEmbed = new Discord.EmbedBuilder()
                        .setTitle(`Transcript do canal - (${interaction.channel.name})`)
                        .setDescription(transcript)
                        .setFooter({ text: `Ticket apagado por: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setColor('#00FF00');

                    const transcriptChannel = client.channels.cache.get("1122285348899258378"); // Obtenha o canal de transcript

                    if (transcriptChannel) {
                        setTimeout(() => {
                            transcriptChannel.send({ embeds: [transcriptEmbed] }); // Envie a embed do transcript
                        }, 2000)
                    } else {
                        console.log('Canal de transcript inválido.');
                        channel.send({ content: 'Erro ao enviar o transcript.', ephemeral: true });
                    }
                } else {
                    console.log('Erro ao gerar o transcript.');
                    channel.send({ content: 'Erro ao gerar o transcript.', ephemeral: true });
                }
            }
        }
    }
}