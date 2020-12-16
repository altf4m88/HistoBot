module.exports = {
    name: 'bug-report',
    description: 'report bug to my developer',
    usage:'|bug-report <bug-to-report>',
    example: '|bug-report oh shit vault 101 overrun by bugs, send help!',
    execute(client, Discord, message, args){
        if(args.join(" ") == '') return message.channel.send("What should i report?");

        let reportEmbed = new Discord.MessageEmbed()
        .setTitle('Bug Report')
        .setColor('RANDOM')
        .setAuthor('HistoBot', 'https://i.kym-cdn.com/photos/images/original/001/464/390/36d.jpg')
        .setDescription('Sir! New bug report!')
        .addField('Problem', ` \`\`\` ${args.join(" ")} \`\`\` `, false)
        .setTimestamp()
        .setFooter(`Sent by ${message.author.username}`);


        let replyEmbed = new Discord.MessageEmbed()
        .setTitle('Bug Report')
        .setColor('RANDOM')
        .setAuthor('HistoBot', 'https://i.kym-cdn.com/photos/images/original/001/464/390/36d.jpg')
        .setDescription('Your report has been sent!')
        .addField('Your Issue: ', ` \`\`\` ${args.join(" ")} \`\`\` `, false)
        .setTimestamp()
        .setFooter('Sorry For The Inconvenience 😔');

        client.users.cache.get(process.env.DEVELOPER_ID).send(reportEmbed);
        message.channel.send(replyEmbed);
    }
}