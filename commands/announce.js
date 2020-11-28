module.exports = {
    name: 'announce',
    description: 'announcement',
    usage:'|announce <text-to-announce>',
    example: '|announce 2020 2 is confirmed',
    execute(Discord, message, args){

        message.delete()
        const embed = new Discord.MessageEmbed()
        .setTitle('🚨ANNOUNCEMENT🚨')
        .setDescription(`${args.join(" ")}`)
        .setFooter(`Brought to you by HistoBot ('-')7`)
        .setColor('RANDOM')

        return message.channel.send(embed);
    }
}