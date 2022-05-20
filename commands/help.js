const help = (argsBody) => {
    let embedAnswer = {
        color: 0x0099ff,
        title: 'Liste des commandes',
        author: {
            name: argsBody.client.user.tag,
            icon_url: argsBody.client.user.avatarURL(),
        },
        description: `Me voici, je me nomme ${argsBody.client.user.tag}, je vous présentes les quelques commandes dont je suis capable :`,
        fields: [
            {
                name: 'Afficher la météo selon votre ville',
                value: `${argsBody.prefix}meteo Paris`,
                inline: false,
            },
            {
                name: "Afficher des mignons petit canard",
                value: `${argsBody.prefix}duck`,
                inline: false,
            },
            {
                name: "Afficher la photo de profile d'un utilisateur",
                value: `${argsBody.prefix}pp @user`,
                inline: false,
            },
            {
                name: "Afficher un gif random",
                value: `${argsBody.prefix}gif`,
                inline: false,
            },
        ],
        image: {
            url: argsBody.client.user.avatarURL(),
        },
        timestamp: new Date(),
        footer: {
            text: `${argsBody.client.user.tag}`,
        },
    };

    argsBody.message.channel.send({embeds: [embedAnswer]});
}
export default help