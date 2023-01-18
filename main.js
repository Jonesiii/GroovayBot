require('dotenv').config();

const {REST, Routes, Events, ActivityType} = require("discord.js");
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { Player } = require("discord-player");
const path = require('node:path');
const fs = require('fs');

const client = new Client({
  intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    ]
  });


// List of all commands
const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands"); // E:\yt\discord bot\js\intro\commands
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

// set status message
client.once("ready", () => {
  console.log("Groovay is online!");
  client.user.setPresence({
    activities: [{
      name: "to great tunes via /play!",
      type: ActivityType.Listening
    }]
  });
});

// Add the player on the client
client.player = new Player(client, {
    ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 27
    }
})

client.on("ready", () => {
    // Get all ids of the servers
    const guild_ids = client.guilds.cache.map(guild => guild.id);


    const rest = new REST({version: '9'}).setToken(process.env.token);
    for (const guildId of guild_ids)
    {
        rest.put(Routes.applicationGuildCommands(process.env.client_id, guildId), 
            {body: commands})
        .then(() => console.log('Successfully updated commands for guild ' + guildId))
        .catch(console.error);
    }
});



client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try
    {
        await command.execute({client, interaction});
    }
    catch(error)
    {
        console.error(error);
        await interaction.reply({content: "There was an error executing this command"});
    }
});

client.login(process.env.token);