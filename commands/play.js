const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
  name: "play",
  description: "Plays the first search result from Youtube. Example usage: !play Michael Jackson Thriller",
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;

    // user error checks
    if (!voiceChannel) return message.channel.send("You need to be in a voice channel to use this command!");
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) 
      return message.channel.send("You don't have the correct permissions to use this bot!");
    if (!args.length) return message.channel.send("You need to give me search parameters too!");


    const connection = joinVoiceChannel({  
      channelId: voiceChannel.id,  
      guildId: message.member.guild.id,  
      adapterCreator: voiceChannel.guild.voiceAdapterCreator  
      });

    // search youtube with given parameters and only return the firts result
    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);
      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null; 
    }

    const video = await videoFinder(args.join(" "));

    if (video) {
      const stream = ytdl(video.url, {filter: "audioonly"});
      const resource = createAudioResource(stream);
      const player = createAudioPlayer();
      connection.subscribe(player);
      player.play(resource)
/*         .on("finish", () => {
          voiceChannel.leave();
        }); */

      await message.reply(`:musical_note: Now Playing:  ***${video.title}*** :musical_note:`);
    } else {
      message.channel.send("No results with given search parameters :thumbsdown:");
    }
  }
}