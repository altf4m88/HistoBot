const Discord = require("../node_modules/discord.js");

module.exports = {
    name: 'announce',
    description: 'announcement',
    execute(message){
        if(message.author.id !== "439976892343517184") return message.channel.send("Nope, you're not my master");

        const embed = new Discord.MessageEmbed()
        .setTitle('🚨ANNOUNCEMENT DEAR COMRADES🚨')
        .setThumbnail('https://i.kym-cdn.com/photos/images/original/001/464/390/36d.jpg')
        .setDescription(`
        `)
        .setFooter(``)
        .setColor('#d40000')

        message.channel.send(embed);
    }
}