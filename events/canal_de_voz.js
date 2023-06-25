const Discord = require("discord.js")
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'ready',
    async execute(client) {

        let canal = client.channels.cache.get("1048390244787032144")
        if (!canal) {
            console.log("❌ | Não achei ou não existe esse canal de voz nos servidores onde eu estou.")
        } else {
            if (canal.type !== Discord.ChannelType.GuildVoice) {
                console.log("❌ | O canal desejado não é um canal de voz.")
            } else {
                try {
                    joinVoiceChannel({
                        channelId: canal.id,
                        guildId: canal.guild.id,
                        adapterCreator: canal.guild.voiceAdapterCreator,
                    })
                    console.log(`✅ | Entre no canal de voz [ ${canal.name} ] com sucesso.`)
                } catch (e) {
                    console.log(`❌ | Não foi possível entrar no [ ${canal.name} ] ${e}`)
                }
            }
        }
    }
}