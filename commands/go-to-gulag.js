const Discord = require("../node_modules/discord.js");

module.exports = {
    name: 'go-to-gulag',
    description: 'GULAGED',
    execute(message, args){
        if(message.author.id !== "439976892343517184") return message.channel.send("Nope, you're not my master");
        let user = message.mentions.users.first() || message.author;

        const embed = new Discord.MessageEmbed()
        .setTitle(`🚨 ${user.username} GULAGED🚨`)
        .setThumbnail('https://memegenerator.net/img/instances/71686149/go-to-gulag.jpg')
        .addField(`${user.username} has been sent to Gulag`, `Reason: Traitor to the motherland`, false)
        .setFooter(`Slava Sovyetsky Soyuz ('-')/`)
        .setColor('#d40000')

        message.channel.send(embed)
    }
}