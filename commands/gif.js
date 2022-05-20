//const https = require('https');
import https from 'https';

export const gif = (argsBody) => {
    https.get(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.gifToken}&tag=fail&rating=pg-13`, (resp) => {
            let data = '';
          
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
              data += chunk;
            });
          
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                let res = JSON.parse(data);
              //console.log(data);
                if(res.error){
                    argsBody.message.reply("une erreur est survenue, contactez le dev si le problème persiste");
                    return;
                }
                if(res.message === "Invalid authentication credentials"){
                    argsBody.message.reply("le token de l'api est invalide, contactez le dev si le problème persiste");
                    return;
                }
                console.log(argsBody.client.user.tag);
                if(process.env.selfbot === 'false'){
                    let embedAnswer = {
                        color: 0x0099ff,
                        title: 'random gif tag fail',
                        image: {
                            url: res.data.images.original.url,
                        },
                        timestamp: new Date(),
                        footer: {
                            text: `${argsBody.client.user.username} • source : giphy`,
                        },
                    };
    
                    argsBody.message.channel.send({embeds: [embedAnswer]}).catch(console.error);
                    return;
                }
                argsBody.message.channel.send({
                    content: `random gif tag fail`,
                    files: [{
                      attachment: res.data.images.original.url,
                      description: `${argsBody.client.user.tag} • source : giphy`,
                    }]
                  })
                    //.then(console.log)
                    .catch(console.error);
                    return;
            }); 
          
          }).on("error", (err) => {
            console.log("Error: " + err.message);
          });
}

/* module.exports = {
    gif
} */
/* export default {gif}; */