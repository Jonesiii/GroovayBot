const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client({
  intents:[
    "GUILDS",
     "GUILD_MESSAGES",
     "GUILD_VOICE_STATES",
    ]
  });


const fs = require('fs');
const prefix = "!";
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Groovay is online!");
  client.user.setActivity("great tunes via !play!", {
    type: "LISTENING"
  });
});

client.on("messageCreate", async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLocaleLowerCase();

  if(command === "ping") {
    client.commands.get("ping").execute(message, args);
  } else if (command === "play") {
    client.commands.get("play").execute(message, args); 
  } else if (command === "stop") {
    client.commands.get("stop").execute(message, args); 
  } 
});

client.on("error", (e) => {
  message.channel.send("Oh no the client encountered an error: ", e);
})

client.login(config.token);