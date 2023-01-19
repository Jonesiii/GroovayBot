const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes the current song."),

	execute: async ({ client, interaction }) => {

        // Get the queue for the server
		const queue = client.player.getQueue(interaction.guildId)

        // If there is no queue, return
		if (!queue)
        {
            return await interaction.reply("There are no songs in the queue");
        }

        const currentSong = queue.current

        // Resume the current song, if it's been paused
		    if(!queue.connection.paused) return await interaction.reply("Can't resume when a track is currently playing.");
        
        queue.setPaused(false);

        // Return an embed to the user saying the song has been paused
        await interaction.reply({
            embeds: [
              new EmbedBuilder()
                    .setDescription(`${currentSong.title} has been paused!`)
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
	},
}