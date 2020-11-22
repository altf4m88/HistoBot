module.exports = {
    name: 'gulag',
    description: 'GULAGED',
    usage:'|gulag <mention>',
    example: '|gulag @comrade-ivan <reason>',
    execute(Discord, message, args){
        
        let user = message.mentions.users.first() || message.author;
        if(message.mentions.users.first() !== '') args.shift();
        let reason = args.join(" ");

        const embed = new Discord.MessageEmbed()
        .setTitle(`🚨 ${user.username} GULAGED🚨`)
        .setThumbnail('https://memegenerator.net/img/instances/71686149/go-to-gulag.jpg')
        .setFooter(`Press F`)
        .setColor('RANDOM');
        if(reason.length > 0){
            embed.addField(`${user.username} has been sent to Gulag`, `Reason: ${reason}`, false)
        } else {
            embed.addField(`${user.username} has been sent to Gulag`, `Reason: Traitor to the motherland`, false)
        }
        return message.channel.send(embed)
    }
}