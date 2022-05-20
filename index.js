import { config } from 'dotenv';
config();
import SelfBotClient from 'discord.js-selfbot-v13';
import BotClient from 'discord.js';
import commands from './utils/importCommands.js';
import *as logs from './utils/logs.js';

//we return into the console the kind of client
process.env.selfbot === 'true' ? console.log("selfbot") : console.log("bot");

//we create the client
const client = process.env.selfbot === 'true' ? new SelfBotClient.Client() : new BotClient.Client({intents: ["GUILDS", "GUILD_MESSAGES", 'GUILD_PRESENCES', 'GUILD_MEMBERS','DIRECT_MESSAGES'], partials: ['CHANNEL']});;

//we define the prefix
const prefix = process.env.prefix;
let LogsChannel;

//bot connecté
client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);
    console.log(client.user.id);
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
    if(message.content.includes('<:kamikaze:977021468439371787>' && process.env.selfbot)){
        message.channel.send("!pan");
    }

    if (!message.content.startsWith(prefix)){
        return;
    }
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    const argsBody= { message, client, args, prefix, command};

    //log
/*     if(message.channel.type === "DM"){
        //console.log(message.channel.type);
        logs.logsConsole(argsBody, true);
    }else{
        //console.log(message.channel.type);
        logs.logsConsole(argsBody, false);
    } */
    message.channel.type === "DM" ? logs.logsConsole(argsBody, true) : logs.logsConsole(argsBody, false);
    if(process.env.LogsChannel){
        message.channel.type === "DM" ? logs.logsDiscord(argsBody,LogsChannel, true) : logs.logsDiscord(argsBody,LogsChannel, false);
    }
    
    if(command === "duck"){
        commands.duck(argsBody);
        return
    }
    if(command === "clearchannel" || command === "cleanchannel"){
        commands.clearchannel(argsBody);
        return;
    }
    if(command === "pp"){
        commands.pp(argsBody);
        return;
    }
    if(command === "help"){
        if(process.env.selfbot === 'true'){
        commands.help(argsBody);
        return;
        }
        message.reply("je suis un bot, tape !!duck !!meteo !!pp !!gif :)");
        return;
    }
    if(command === "test"){
        commands.test(argsBody);
        return;
    }
    if(command === "meteo"){
        commands.meteo(argsBody);
        return;
    }
    if(command === "gif"){
        commands.gif(argsBody);
        return;
    }
    if(command === "token"){
        commands.token.fakeToken(argsBody);
        return;
    }
});

//we log the bot with the token
client.login(process.env.token);