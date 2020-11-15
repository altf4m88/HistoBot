const Discord = require("../node_modules/discord.js");

module.exports = {
    name: 'medal',
    description: 'give medal to someone',
    execute(message, args){
        if(message.author.id !== "439976892343517184") return message.channel.send("Nope, you're not my master");
        let user = message.mentions.users.first() || message.author;
        const embed = new Discord.MessageEmbed()
        console.log(args)
        switch(args[1]){
            case "iron-cross" || "ironcross":
                embed.setTitle(`✠ ${user.username} Has Been Awarded With Iron Cross ✠`)
                .setThumbnail('https://img.welt.de/img/politik/mobile101404450/3612502417-ci102l-w1024/kreuz-still-DW-Politik-Frankfurt-Main-jpg.jpg')
                .setDescription(`For your heroic deeds, i hereby presents you this Iron Cross Medal`)
                .setFooter(`Congratulations Kameraden! ('-')/`)
                .setColor('#d40000')
                message.channel.send(embed);
                break;
            case "red-star" || "redstar":
                embed.setTitle(`☭ ${user.username} Has Been Awarded Order Of The Red Star ☭`)
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/0/0f/Order_of_the_Red_Star.jpg')
                .setDescription(`For your heroic deeds, the motherland rewards you with Order of the Red Star`)
                .setFooter(`Moskva Znami! ('-')/`)
                .setColor('#d40000')
                message.channel.send(embed);
                break;
            case "medal-of-honor" || "medalofhonor":
                embed.setTitle(`⭐ ${user.username} Has Been Awarded With Medal Of Honor ⭐`)
                .setThumbnail('https://www.army.mil/e2/images/rv7/features/valor/moh.jpg')
                .setDescription(`For your heroic deeds, you are awarded with Medal of Honor`)
                .setFooter(`Land of The free, Home of the Brave ! ('-')/`)
                .setColor('#d40000')
                message.channel.send(embed);
                break;
            case "victoria-cross" || "victoriacross":
                embed.setTitle(`💂 ${user.username} Has Been Awarded With Victoria Cross 💂`)
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