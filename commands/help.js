const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

const ping = require('./ping');
const play = require('./play');
const exit = require('./exit');
const skip = require('./skip');
const pause = require('./pause');
const resume = require('./resume');
const queue = require('./queue');

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
        {name:"```/pause```", value: pause.data.description},
        {name:"```/resume```", value: resume.data.description},
        {name:"```/skip```", value: skip.data.description},
        {name:"```/queue```", value: queue.data.description},
        {name:"```/exit```", value: exit.data.description},
      );

    return interaction.reply({content:' ', ephemeral: true, embeds: [embed]});
  }
}