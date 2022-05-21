
import fetch from 'node-fetch';

const geocoding = async (ville) => {
    let geocode = await fetch(`https://positionstack.com/geo_api.php?query=${ville}`).then(resultat => resultat.json());
    return geocode.data;
};

const openweathermap = async  (data) => {
    //console.log(data);
    let latitude = data[0].latitude;
    let longitude = data[0].longitude;
    //console.log(latitude + " " + longitude);
    let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${process.env.OPENWEATHERMAP_API_KEY}`).then(resultat => resultat.json());
    //console.log(weather);
    return weather;
};

const meteo = async (argsBody) => {
    if (argsBody.args[0] != null){
        let ville = argsBody.args.join(' ');
        ville = ville.toLowerCase();
        let geocode = await geocoding(ville);
        if (geocode != undefined){
            let weather = await openweathermap(geocode);
            if (weather != undefined && weather.cod != "400"){
                if(process.env.selfbot == "false"){
                    argsBody.message.channel.send({
                        embeds: [{
                        color: 0x0099ff,
                        title: `Météo de ${weather.name}`,
                        author: {
                            name: 'Météo',
                        },
                        description: `${weather.weather[0].description}`,
                        thumbnail: {
                            url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Weather_%28iOS%29.png',
                        },
                        fields: [
                            { name: 'Température', value: `${weather.main.temp}°C`, inline: true },
                            { name: 'Humidité', value: `${weather.main.humidity}%`, inline: true },
                            { name: 'Pression', value: `${weather.main.pressure}hPa`, inline: true },
                            { name: 'Vent', value: `${weather.wind.speed}km/h`, inline: true },
                            { name: 'Ressenti', value: `${weather.main.feels_like}°C`, inline: true },
                            { name: 'Température min', value: `${weather.main.temp_min}°C`, inline: true },
                            { name: 'Température max', value: `${weather.main.temp_max}°C`, inline: true },
                        ],
                        image: {
                            url: `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`,
                        },
                        timestamp: new Date(),
                        footer: {
                            text: `${argsBody.client.user.username} • Météo de ${ville} ${geocode[0].region} ${geocode[0].country} • source : openweathermap.org`,
                        },
                        }],});
                    return;
                }
                argsBody.message.channel.send({
                    content: `Météo sur ${weather.name} \n • descriptions: ${weather.weather[0].description} \n • Température : ${weather.main.temp}°C \n • Humidité: ${weather.main.humidity}% \n • Pression: ${weather.main.pressure}hPa \n • Vent: ${weather.wind.speed}km/h \n • Ressenti: ${weather.main.feels_like}°C \n • Température min: ${weather.main.temp_min}°C \n • Température max: ${weather.main.temp_max}°C \n`,
                    files: [{
                        attachment: `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`,
                        description: `${argsBody.client.user.tag} • Météo de ${geocode[0].name} ${geocode[0].region} ${geocode[0].country} • source : openweathermap.org `,
                    }]
                    }).catch(console.error);
                return;
            }
        }
    }
    else{
        argsBody.message.reply("Vous devez préciser une ville");
    }
};

export default meteo;