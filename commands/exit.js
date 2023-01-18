const {SlashCommandBuilder} = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("exit")
    .setDescription("Stops playing and exits the voice channel."),
  execute: async ({client, interaction}) => {
    const queue = client.player.getQueue(interaction.guild);

    queue.destroy();

    await interaction.reply({content: "Ok, I'll leave :smiling_face_with_tear:", ephemeral: false});
  }

}
