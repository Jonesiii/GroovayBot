module.exports = {
  name: "ping",
  description: "Pings the server",
  execute(message, args) {
    message.channel.send("Pong!");
  }
}