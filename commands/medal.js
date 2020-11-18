const Discord = require("../node_modules/discord.js");

module.exports = {
    name: 'medal',
    description: 'give medal to someone',
    usage:'|medal <name / mention / me> <medal-type (iron-cross, red-star, victoria-cross, medal-of-honor)>',
    example: '|medal @comrade-igor red-star',
    execute(client, message, args){
        let guild = client.guilds.cache.get(message.guild.id);
        let member = guild.member(message.mentions.users.first());
        let user = member ? member.displayName : args[0];
        console.log(user)
        if(user == undefined){
            user = message.author.username;
        } else if(user == "me" || user == "Me"){
            user = message.author.username;
        }

        let name = user.replace(/-/g , " ");
        const embed = new Discord.MessageEmbed()
        console.log(name);
        switch(args[1]){
            case "iron-cross" || "ironcross":
                embed.setTitle(`✠ ${name} Has Been Awarded With Iron Cross ✠`)
                .setThumbnail('https://img.welt.de/img/politik/mobile101404450/3612502417-ci102l-w1024/kreuz-still-DW-Politik-Frankfurt-Main-jpg.jpg')
                .setDescription(`For your heroic deeds, i hereby presents you this Iron Cross Medal`)
                .setFooter(`Congratulations Kameraden! ('-')/`)
                .setColor('#d40000')
                message.channel.send(embed);
                break;
            case "red-star" || "redstar":
                embed.setTitle(`☭ ${name} Has Been Awarded Order Of The Red Star ☭`)
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/0/0f/Order_of_the_Red_Star.jpg')
                .setDescription(`For your heroic deeds, the motherland rewards you with Order of the Red Star`)
                .setFooter(`Moskva Znami! ('-')/`)
                .setColor('#d40000')
                message.channel.send(embed);
                break;
            case "medal-of-honor" || "medalofhonor":
                embed.setTitle(`⭐ ${name} Has Been Awarded With Medal Of Honor ⭐`)
                .setThumbnail('https://www.army.mil/e2/images/rv7/features/valor/moh.jpg')
                .setDescription(`For your heroic deeds, you are awarded with Medal of Honor`)
                .setFooter(`Land of The free, Home of the Brave ! ('-')/`)
                .setColor('#d40000')
                message.channel.send(embed);
                break;
            case "victoria-cross" || "victoriacross":
                embed.setTitle(`💂 ${name} Has Been Awarded With Victoria Cross 💂`)
                .setThumbnail('https://i.pinimg.com/originals/f4/71/50/f471506e71857bef33ba4ac98997c9f5.jpg')
                .setDescription(`For your heroic deeds, the Queen awarded you with Victoria Cross`)
                .setFooter(`God Save The Queen! ('-')/`)
                .setColor('#d40000')
                message.channel.send(embed);
                break;
            default:
                message.channel.send("You didn't choose the medal type")
        }

    }
}