export const logsDiscord = (argsBody,LogsChannel, mp) => {
    if(process.env.selfbot === 'false'){
        LogsChannel.send({
            embeds: [{
                color: 0x0099ff,
                author: {
                    name: argsBody.message.author.tag,
                    icon_url: argsBody.message.author.avatarURL(),
                    url: `https://discord.com/channels/@me/${argsBody.message.author.tag}`,
                },
                fields: [
                    {
                        name: `${mp ? 'Message privé' : 'Message public'}`,
                        value: argsBody.message.content,
                    }],
                timestamp: new Date(),
                footer: {
                    text: `${argsBody.client.user.tag}`,
                },
            }],
          })
        return;
    }
    LogsChannel.send({
        content: `${mp ? `Message privé <@${argsBody.message.author.id}>`: `Message public <@${argsBody.message.author.id}>` } : ${argsBody.prefix + argsBody.command + ' ' + argsBody.args.join(' ')}`,
        files: [{
            attachment: argsBody.message.author.avatarURL(),
            description: `${argsBody.client.user.tag}• log`
        }]
    }).catch(console.error);
    return;
}
export const logsConsole = (argsBody, mp) => {
    //console.log(mp)
    let now = new Date();
    let annee   = now.getFullYear();
    let mois    = ('0'+(now.getMonth()+1)).slice(-2);
    let jour    = ('0'+now.getDate()   ).slice(-2);
    let heure   = ('0'+now.getHours()  ).slice(-2);
    let minute  = ('0'+now.getMinutes()).slice(-2);
    let seconde = ('0'+now.getSeconds()).slice(-2);
    console.log(`════════════════════════ \n ${heure}:${minute}:${seconde} ${jour}/${mois}/${annee} \n ${mp ? `\x1b[31mMessage privé\x1b[0m \x1b[1m\x1b[36m${argsBody.message.author.username}\x1b[0m`: `\x1b[32mMessage public \x1b[1m\x1b[36m${argsBody.message.author.username}\x1b[0m`} <@${argsBody.message.author.id}>: ${argsBody.prefix + argsBody.command + ' ' + argsBody.args.join(' ')}`)
}
//module.exports = { logsDiscord, logsConsole }
/* export default { logsDiscord, logsConsole } */