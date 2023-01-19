const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the current song."),

	execute: async ({ client, interaction }) => {

        // Get the queue for the server
		const queue = client.player.getQueue(interaction.guildId)

        // If there is no queue, return
		if (!queue)
        {
            return await interaction.reply("There are no songs in the queue");
        }

        const currentSong = queue.current

        // Pause the current song if there's a song playing
		    if(queue.connection.paused) return await interaction.reply("Can't pause if a track is not playing.");
        
        queue.setPaused(true);

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