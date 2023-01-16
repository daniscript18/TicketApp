# Ticket App

Without a doubt the best open source Discord Ticket bot.

You can use this code for whatever you want, I'm a hobbyist programmer I do these projects to reinforce my learning.

## What is TicketApp?

Originally called osTicket it is simply a Tickets bot for Discord, most of this bot is based on other Discord bots like Ticket Tools, obviously it is a recreation of the bot so this is not the original code.

It is currently in constant development and I would like you to give it a good idea, of course, I am developing it only from my little knowledge, the mission of this project is to reinforce my learning, even so, I am open to suggestions for the code and even to possible improvements and collaborators.

## Images

<img title="a title" alt="Alt text" src="https://i.ibb.co/3zJgcNG/1.png">
<img title="a title" alt="Alt text" src="https://i.ibb.co/BVqwPDR/2.png">
<img title="a title" alt="Alt text" src="https://i.ibb.co/wC8w7Tf/3.png">

## Features

```
1. Simple
2. Discord Slash Commands
3. Create, close and delete tickets
4. You can add roles and admins (there is no command yet, but it can be done by changing the values in the database.
5. You can set permissions for roles, admins and users (there isn't a command yet, but you can by changing the values in the database.
6. You can set who can use the commands (there is no command yet, but it can be done by changing the values in the database.
-. And much more...
```

## Requirements

You need to have `node.js 16.9.0` or higher installed, also `NPM 7.21.1` or higher.

To run the preformulated install command you will need a console and have `git` installed. Preferably the console should be bash to execute the other commands.

## Install

Clone the repository and install the necessary modules.

```bash
git clone https://github.com/daniscript/osTicket && \
cd osTicket ; npm install
```

## Configuration

Enter the Token of our bot and the connection URL to the MongoDB database.

1. [Discord Developers](https://discord.com/developers)
2. [MongoDB](mongodb.com)

We edit the configuration file.

```bash
nano Src/Config.js
```

We change the value of `GetToken` to your bot's token and `GetMongoUrl` to the URL of the connection to our database.

```javascript
module.exports =
{
    GetToken: "TOKEN",
    GetMongoUrl: "MONGO_URL",
}
```

## Start

To start developer mode use this command (must have nodemon installed).

```bash
npm run dev
```

To start the bot normally use this command.

```bash
npm run start
```
