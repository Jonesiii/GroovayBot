const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows the first 20 songs in queue."),

	execute: async ({ client, interaction }) => {

    // Get the queue for the server
		const queue = client.player.getQueue(interaction.guildId)

    // If there is no queue, return
		if (!queue)
      {
          return await interaction.reply("There are no songs in the queue.");
      }

      // only show 20 upcoming songs
      const trackQueue = queue.tracks.slice(0, 20).map((track, i) => {
        return `${i+1}. [${track.duration}] **${track.title}** requested: @${track.requestedBy.username}`
      }).join("\n");

      const currentTrack = queue.current;

      if (trackQueue.length < 1) return interaction.reply("No songs coming up after this one.")
      const embed = new EmbedBuilder()
        .setAuthor({name: "Queue"})
        .setTitle(`Currently playing: ${currentTrack.title}`)
        .setThumbnail(currentTrack.thumbnail)
        .setDescription(`${trackQueue}`);

      // Return an embed to the user containing the queue
      await interaction.reply({
          embeds: [ embed ]
      })
	},
}