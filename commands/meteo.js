//const http = require('http');
import http from 'http';
const meteo = (argsBody) => {
    if (argsBody.args[0] != null){
        let ville = argsBody.args.join(' ');
        http.get(`http://api.weatherstack.com/current?access_key=${process.env.meteoToken}&query=${ville}`, (resp) => {
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
                argsBody.message.reply("une erreur est survenue, vérifiez le nom de la ville, ou contactez le dev <@208246410661986304>");
            }
            else{
            let now = new Date();
            let heure   = ('0'+now.getHours()  ).slice(-2);
            let minute  = ('0'+now.getMinutes()).slice(-2);

            if(process.env.selfbot === 'false'){
                let embedAnswer = {
                    color: 0x0099ff,
                    title: 'Météo sur ' + res.location.name,
                    author: {
                        name: 'Météo',
                    },
                    description: res.location.name + ' ' + res.location.region + ' ' + res.location.country + ' à ' + heure + ":" + minute,
                    thumbnail: {
                        url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Weather_%28iOS%29.png',
                    },
                    fields: [
                        {
                            name: 'température',
                            value: res.current.temperature + '°C',
                            inline: true,
                        },
                        {
                            name: 'vent',
                            value: res.current.wind_speed + 'km/h en direction : ' + res.current.wind_dir,
                            inline: true,
                        },
                        {
                            name: 'descriptions',
                            value: res.current.weather_descriptions[0],
                            inline: true,
                        },
                    ],
                    image: {
                        url: res.current.weather_icons[0],
                    },
                    timestamp: new Date(),
                    footer: {
                        text: `${argsBody.client.user.username} • source : weatherstack.com`,
                    },
                };

                argsBody.message.channel.send({embeds: [embedAnswer]});
                return;
            }
            argsBody.message.channel.send({
                content: `Météo sur ${res.location.name} \n • température: ${res.current.temperature}°C \n • vent: ${res.current.wind_speed}km/h en direction ${res.current.wind_dir} \n • descriptions: ${res.current.weather_descriptions[0]}`,
                files: [{
                  attachment: res.current.weather_icons[0],
                  description: `${argsBody.client.user.tag} • source : weatherstack.com ` + res.location.name + ' ' + res.location.region + ' ' + res.location.country + ' à ' + heure + ":" + minute
                }]
              }).catch(console.error);
            }

          }); 
        
        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });

        
    }
    else{
        argsBody.message.reply(`Entrez une ville après ${argsBody.prefix}meteo`);
    }
};

/* module.exports = {
    meteo
} */
export default meteo;