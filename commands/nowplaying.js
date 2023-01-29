const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("Shows the currently playing song."),

	execute: async ({ client, interaction }) => {

        // Get the queue for the server
		const queue = client.player.getQueue(interaction.guildId)

        // If there is no queue, return
		if (!queue)
        {
            return await interaction.reply("There are no songs in the queue.");
        }

        const currentTrack = queue.current;

        const embed = new EmbedBuilder()
          .setTitle(`Currently playing: ${currentTrack.title} ${currentTrack.url}`)
          .setThumbnail(currentTrack.thumbnail)

        // Return an embed to the user containing the currently playing song
        await interaction.reply({
            embeds: [ embed ]
        })
	},
}