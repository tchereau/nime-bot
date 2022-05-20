export const clearchannel = async (argsBody) => {
    console.log("clearchannel");
    if(argsBody.message.channel.type === "DM"){
        argsBody.message.reply("je ne peux pas faire ça dans un DM");
        return;
    }
    console.log(argsBody.args[0]);
/*     if(argsBody.args[0] && argsBody.args[0] >= 1 || argsBody.args[0] <= 100){
        try{
            console.log('suppression de ' + argsBody.args[0] + ' messages');
            argsBody.message.channel.bulkDelete(argsBody.args[0]);
        }catch(e){
            console.log(e);
            argsBody.message.reply("erreur dans le nombre indiqué");
        }
        argsBody.message.channel.send(`${argsBody.message.author.username} a supprimé ${argsBody.args[0]} messages`);
        return;
    }
    argsBody.message.channel.send("Vous devez indiquer un nombre entre 2 et 100"); */
    return;
}

// async function clearchannel(argsBody){ //argsBody.args[0] = nombre de message à supprimer (max 100)
//     if(argsBody.args <= 1 || argsBody.args <= 100){
//         try{
//             await argsBody.message.channel.bulkDelete(argsBody.args[0]);
//         }catch(e){
//             console.log(e);
//             argsBody.message.reply("erreur dans le nombre indiqué");
//         }
//         argsBody.message.channel.send(`${argsBody.message.author.username} a supprimé ${argsBody.args} messages`);
//         return;
//     }
//         argsBody.message.channel.send("Vous devez indiquer un nombre entre 2 et 100");
//         return;
// }

//module.exports = { clearchannel }
/* export default {clearchannel}; */