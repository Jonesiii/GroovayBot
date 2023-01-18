module.exports = {
  name: "ping",
  description: "pings the server!",
  execute(message, args) {
    message.channel.send("Pong!");
  }
}