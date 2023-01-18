const { MessageEmbed } = require('discord.js');
const ping = require('./ping');
const play = require('./play');
const stop = require('./stop');

module.exports = {
  name: "help",
  description: "gives the available commands",
  execute(message, args) {

    const embed = new MessageEmbed()
      .setTitle("Available Commands:")
      .addField("```!ping```", ping.description)
      .addField("```!play```", play.description)
      .addField("```!stop```", stop.description);

    message.reply({embeds: [embed]});
  }
}