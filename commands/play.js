const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const {QueryType} = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song from YouTube.")
    .addSubcommand(subcommand => {
      return subcommand
        .setName("search")
        .setDescription("Searches for a song.")
        .addStringOption(option => {
          return option
            .setName("searchparameters")
            .setDescription("search keywords")
            .setRequired(true);
        })
    })
    .addSubcommand(subcommand => {
      return subcommand
        .setName("playlist")
        .setDescription("plays a playlist from YouTube.")
        .addStringOption(option => {
          return option
            .setName("url")
            .setDescription("playlist url")
            .setRequired(true);
        })
    })
    .addSubcommand(subcommand => {
      return subcommand
        .setName("link")
        .setDescription("plays a song from a YouTube link.")
        .addStringOption(option => {
          return option
            .setName("url")
            .setDescription("song url")
            .setRequired(true);
        })
    }),
    execute: async({client, interaction}) => {
      if (!interaction.member.voice.channel) {
        return interaction.reply("You must be in a voice channel to use this command!"); 
      }

      const queue = await client.player.createQueue(interaction.guild);

      if (!queue.connection) await queue.connect(interaction.member.voice.channel);

      let embed = new EmbedBuilder();

      // youtube single video url search
      if (interaction.options.getSubcommand() === "link") {
        let url = interaction.options.getString("url");

        const result = await client.player.search(url, {
          requestedBy: interaction.user,
          searchEngine: QueryType.YOUTUBE_VIDEO
        });

        if (result.tracks.length === 0) {
          await interaction.reply("No results found.");
          return;
        }
        const song = result.tracks[0];
        await queue.addTrack(song);

        embed
          .setDescription(`:musical_note: Added:  ***[${song.title}(${song.url}*** to the queue. :musical_note:`)
          .setThumbnail(song.thumbnail)
          .setFooter({text: `Duration: ${song.duration}`});
      }

      // youtube playlist url search
      else if (interaction.options.getSubcommand() === "playlist") {
        let url = interaction.options.getString("url");

        const result = await client.player.search(url, {
          requestedBy: interaction.user,
          searchEngine: QueryType.YOUTUBE_PLAYLIST
        });

        if (result.tracks.length === 0) {
          await interaction.reply("No playlist found.");
          return;
        }
        const playlist = result.tracks[0];
        await queue.addTrack(playlist);

        embed
          .setDescription(`:musical_note: Added:  ***[${playlist.title}(${playlist.url}*** to the queue. :musical_note:`)
          .setThumbnail(playlist.thumbnail)
          .setFooter({text: `Duration: ${playlist.duration}`});
      }

      // youtube keyword search (adds the first result to queue)
      else if (interaction.options.getSubcommand() === "search") {
        let url = interaction.options.getString("searchparameters");

        const result = await client.player.search(url, {
          requestedBy: interaction.user,
          searchEngine: QueryType.AUTO
        });

        if (result.tracks.length === 0) {
          await interaction.reply("No results found.");
          return;
        }
        const song = result.tracks[0];
        await queue.addTrack(song);

        embed
          .setDescription(`:musical_note: Added:  ***[${song.title}(${song.url}*** to the queue. :musical_note:`)
          .setThumbnail(song.thumbnail)
          .setFooter({text: `Duration: ${song.duration}`});
      }

      // actually play something
      if (!queue.playing) await queue.play();

      await interaction.reply({
        content: ' ', ephemeral: false, embeds: [embed]
      })
    }
}
