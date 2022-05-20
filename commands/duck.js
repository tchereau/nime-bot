//const https = require('https');
import https from 'https';
const duck = (argsBody) => {
    https.get(`https://random-d.uk/api/v2/random`, (resp) => {
        let data = '';
    
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            let res = JSON.parse(data);
            try{
                if(process.env.selfbot === 'false'){
                    let embedAnswer = {
                        color: 0x0099ff,
                        title: 'Duck',
                        image: {
                            url: res.url,
                        },
                        timestamp: new Date(),
                        footer: {
                            text: `${argsBody.client.user.username} • source : random-d.uk`,
                        },
                    };
                    argsBody.message.channel.send({embeds: [embedAnswer]}).catch(console.error);
                    return;
                }
                argsBody.message.channel.send({
                    content: `Coin`,
                    files: [{
                        attachment: res.url,
                        description: `${argsBody.client.user.tag} • source : random-d.uk`
                    }]
                }).catch(console.error);
                return;
            }catch(e){
                console.log(e);
                argsBody.message.reply("une erreur est survenue, contactez le dev si le problème persiste");
                return;
            }
        }); 
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}
export default duck;