//const { timeout } = require('discord.js')


export const mute = async (argsBody) => {
    if(argsBody.message.channel.type === "DM"){
        argsBody.message.reply("je ne peux pas faire ça dans un DM");
        return;
    }
    if(argsBody.args.length === 0){
        argsBody.message.reply("mute <user> <time>");
        return;
    }
    try{
        const user = argsBody.message.mentions.users.first();
        const time = argsBody.args[1];
        const timeInMs = time * 1000;
        const muteRole = await argsBody.message.guild.roles.cache.find(role => role.name === "mute");
        if(!muteRole){
            argsBody.message.reply("le rôle mute n'existe pas");
            return;
        }
        if(!user){
            argsBody.message.reply("mute <user> <time>");
            return;
        }
        if(!time){
            argsBody.message.reply("mute <user> <time>");
            return;
        }
        //await user.roles.add(muteRole.id);
        await user.roles.add("976599556974338118");
        await argsBody.message.channel.send(`${user} a été mute pour ${time} secondes`);
        await setTimeout(() => {
            //user.roles.remove(muteRole.id);
            user.roles.remove("976599556974338118");
            argsBody.message.channel.send(`${user} a été unmute`);
        }, timeInMs);
    }catch(e){
        console.log(e);
        argsBody.message.reply("erreur dans le mute");
    }
}

//module.exports = { mute }
/* export default {mute}; */
// export default { mute };
