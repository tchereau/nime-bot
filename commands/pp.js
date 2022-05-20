//const {MessageAttachment} = require("discord.js-selfbot-v13");
export const pp = (argsBody) => {
    try{
        if(argsBody.args[0]){
            let user = argsBody.args[0].split("<@")[1].split(">")[0];
            //console.log(user);
            argsBody.client.users.fetch(user).then((User) => {
                if(process.env.selfbot === 'false'){
                    let embedAnswer = {
                        color: 0x0099ff,
                        title: 'Photo de profile de ' + User.username,
                        image: {
                            url: User.avatarURL(),
                        },
                        timestamp: new Date(),
                        footer: {
                            text: `${argsBody.client.user.username}`,
                        },
                    };
    
                    argsBody.message.channel.send({embeds: [embedAnswer]});
                    return;
                }
                argsBody.message.channel.send({
                    content: `Photo de profil de <@${User.id}>`,
                    files: [{
                      attachment: User.avatarURL(),
                      description: `Photo de profil de ${User.username}`
                    }]
                  })
                    //.then(console.log)
                    .catch(console.error);
            }).catch(console.error);
            return;
        }
        argsBody.message.reply("indique un pseudo !!pp @pseudo");
        return;
    }catch(e){
        console.log(e);
        argsBody.message.reply("erreur dans le pseudo indiqué");
        return;
    }
}
/* module.exports ={
    pp
}; */
/* export default {pp}; */