module.exports = {
    name: 'announce',
    description: 'announcement',
    usage:'|announce <text-to-announce>',
    example: '|announce 2020 2 is confirmed',
    execute(Discord, message, args){
        if(message.author.id !== "439976892343517184") return message.channel.send("Nope, you're not my master");

        message.delete()
        const embed = new Discord.MessageEmbed()
        .setTitle('🚨ANNOUNCEMENT🚨')
        .setDescription(`${args.join(" ")}`)
        .setFooter(`Brought to you by HistoBot ('-')7`)
        .setColor('RANDOM')

        return message.channel.send(embed);
    }
}