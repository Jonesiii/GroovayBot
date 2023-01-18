const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

const ping = require('./ping');
const play = require('./play');
const exit = require('./exit');
const skip = require('./skip');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Gives the available commands"),
  execute: ({client, interaction}) => {

    let embed = new EmbedBuilder();
    
    embed
      .setTitle("Available Commands:")
      .addFields(
        {name:"```/ping```", value: ping.data.description},
        {name:"```/play```", value: play.data.description},
        {name:"```/exit```", value: exit.data.description},
        {name:"```/skip```", value: skip.data.description},
      );

    return interaction.reply({content:' ', ephemeral: true, embeds: [embed]});
  }
}