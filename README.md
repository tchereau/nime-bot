# nime-bot

<div align="center">
  <br />
  <p>
    <a href="https://discord.js.org"><img src="https://cdn.discordapp.com/avatars/974695121155141642/a6697e7c91a34766c8bd1708a267d5a6.png?size=4096" width="128" alt="nime-bot" /></a>
  </p>
</div>

## About

nime is a little bot made in javascript with node js
this bot have some commands

- duck
    this command will send a beautiful duck
- meteo
    this one will show you the weather depending of the city you choose
- pp
    will send in the channel the profile picture of the user you've mentioned
- gif
    this last will send a gif with the tag "fail"

## Install

Node.js v16.15.0 or newer is required.

```bash
git clone git@github.com:tchereau/nime-bot.git
cd nime-bot
npm i
cp .env.example .env
```

The last thing to get up the bot is to configure the dot env

```basic
# bot token
token=""
# define bot type
selfbot='false'
# define log channel
LogsChannel=""
# define your weather token api
OPENWEATHERMAP_API_KEY=
# define your giphy token api
gifToken=""
# define your prefix
prefix="!!" 
```

```token``` is where you put the token of your bot, this one could be a real bot, or the token of a discord user to make a selfbot, in this case you should define the variable selfbot to ```"true"```

```LogsChannel``` is where you want to put your logs, here you have to past the id of this channel

```OPENWEATHERMAP_API_KEY```is your openweather map token, you can get one [here](https://openweathermap.org/api) (it will take 2 hours to get activated) 

```gifToken```is your giphy token, you can obtain one [here](https://developers.giphy.com/)

```prefix```is how you will call a commands, for example ```!!duck``` you should put ```!!``` in ```prefix```

## Dependencies

[Discord.JS](https://github.com/discordjs/discord.js) 
[Discord.JS-selfbot-v13](https://github.com/aiko-chan-ai/discord.js-selfbot-v13) 
[dotenv](https://github.com/motdotla/dotenv) 

Thanks to them :)
