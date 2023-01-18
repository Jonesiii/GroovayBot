# GroovayBot

Groovay is a simple Discord bot for playing music in a voice channel. It searches YouTube with
the user's input and plays the first search result in the voice channel.

## Requirements

Node 18
[FFMPEG](https://ffmpeg.org/download.html#build-windows) 

## Installation

Use the Node package manager [npm] to install dependencies.

```bash
npm install
```

To add your bot to a Discord server, follow this [guide](https://www.upwork.com/resources/how-to-make-discord-bot).

You need to create a .env file and paste the text from the .envSample
with your personal token and client id (see above guide for the token and id).

## Usage

```bash
node main.js
```
```js
/help // in a Discord channel to get available commands 
```