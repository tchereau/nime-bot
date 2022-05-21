import { config } from 'dotenv';
config();
import SelfBotClient from 'discord.js-selfbot-v13';
import BotClient from 'discord.js';
import commands from './utils/importCommands.js';
import *as logs from './utils/logs.js';

//we return into the console the kind of client
process.env.selfbot === 'true' ? console.log("\x1b[31mselfbot\x1b[0m") : console.log("\x1b[31mbot\x1b[0m");

//we create the client
const client = process.env.selfbot === 'true' ? new SelfBotClient.Client() : new BotClient.Client({intents: ["GUILDS", "GUILD_MESSAGES", 'GUILD_PRESENCES', 'GUILD_MEMBERS','DIRECT_MESSAGES'], partials: ['CHANNEL']});;

//we define the prefix
const prefix = process.env.prefix;
let LogsChannel;

//bot connecté
client.on('ready', async () => {
    console.log(`\x1b[32mConnecté\x1b[0m sous \x1b[1m\x1b[36m${client.user.username}\x1b[0m`);
    console.log(`ID: \x1b[1m\x1b[36m${client.user.id}\x1b[0m`);
    client.user.setStatus('dnd');
    client.user.setActivity(process.env.selfbot ? "selfbot" : "bot")
    /* client.user.setActivity('activity', { type: 'WATCHING' });
    client.user.setActivity('activity', { type: 'LISTENING' });
    client.user.setActivity('activity', { type: 'COMPETING' }); */
    LogsChannel = client.channels.cache.get(process.env.LogsChannel);
})


//bot message received
client.on("messageCreate", async function(message){
    //console.log(message.content);
    if(message.content === `<@${client.user.id}>`){
        message.reply("je suis un bot, tape !!duck !!meteo !!pp !!gif :)");
        return;
    }
    // for fun with duck bot
    if(message.content.includes(':kamikaze:') && process.env.selfbot === "true"){
        message.channel.send("!pan");
    }
    //uncomment this if you want to be the only one to use the bot and add your id
    //if(message.author.id != "208246410661986304"){ return; }

    if (!message.content.startsWith(prefix)){
        return;
    }
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    const argsBody= { message, client, args, prefix, command};

    message.channel.type === "DM" ? logs.logsConsole(argsBody, true) : logs.logsConsole(argsBody, false);
    if(process.env.LogsChannel){
        message.channel.type === "DM" ? logs.logsDiscord(argsBody,LogsChannel, true) : logs.logsDiscord(argsBody,LogsChannel, false);
    }

    switch(command){
        case "duck":
            commands.duck(argsBody);
            break;
        case "clearchannel":
            commands.clearchannel(argsBody);
            break;
        case "pp":
            commands.pp(argsBody);
            break;
        case "help":
            if(process.env.selfbot === 'false'){
                commands.help(argsBody);
                break;
            }
            message.reply("je suis un bot, tape !!duck !!meteo !!pp !!gif :)");
            break;
        case "test":
            commands.test(argsBody);
            break;
        case "meteo":
            commands.meteo(argsBody);
            break;
        case "gif":
            commands.gif(argsBody);
            break;
        case "token":
            commands.token.fakeToken(argsBody);
            break;
        default:
            message.reply("je ne connais pas cette commande");
            break;
    }
});

//we log the bot with the token
client.login(process.env.token);