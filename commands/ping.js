const {SlashCommandBuilder} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pings the server."),
  execute({client, interaction}) {
    interaction.reply({content: "Pong!", ephemeral: true})
  }
}