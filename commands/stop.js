const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
  name: "stop",
  description: "Makes the bot stop playing music and leave the voice channel",
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.channel.send("You need to be in a voice channel to use this command!");

    const connection = getVoiceConnection(voiceChannel.guild.id);
    connection.destroy();
    await message.channel.send("Leaving channel :smiling_face_with_tear:");
  }
}