const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "help",
  description: "gives the available commands",
  execute(message, args) {

    const embed = new MessageEmbed()
      .setTitle("Available Commands:")
      .addField("```!ping```", "Pings the server")
      .addField("```!play```", "Plays the first search result from Youtube. Example usage: !play Michael Jackson Thriller")
      .addField("```!stop```", "Makes the bot stop playing music and leave the voice channel");

    message.reply({embeds: [embed]});
  }
}