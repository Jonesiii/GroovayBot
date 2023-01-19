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
            return await interaction.reply("There are no songs in the queue");
        }

        // only show 20 upcoming songs
        const trackQueue = queue.tracks.slice(0, 20).map((track, i) => {
          return `${i+1}. [${track.duration}] **${track.title}** requested: @${track.requestedBy.username}`
        }).join("\n");

        const currentTrack = queue.current;


        const embed = new EmbedBuilder()
          .setAuthor({name: "Queue"})
          .setTitle(`Currently playing: ${currentTrack}`)
          .setThumbnail(currentTrack.thumbnail)
          .setDescription(`${trackQueue}`);

        // Return an embed to the user saying the song has been paused
        await interaction.reply({
            embeds: [ embed ]
        })
	},
}