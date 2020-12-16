module.exports = {
    name: 'bug-report',
    description: 'report bug to my developer',
    usage:'|bug-report <bug-to-report>',
    example: '|bug-report oh shit vault 101 overrun by bugs, send help!',
    execute(Discord, message, args){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("I don't have permission to speak that");
        if(args.join(" ") == '') return message.channel.send("What should i report?");

        let embed = new Discord.MessageEmbed()
        .setTitle('Bug Report')
        .setColor('RANDOM')

        
        message.channel.send(args.join(" "))
    }
}