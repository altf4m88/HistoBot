module.exports = {
    name: 'help',
    description: 'display command list / command info',
    usage:'|help <command-name>',
    example: '|help search-events',
    execute(Discord, message, args){
        const embed = new Discord.MessageEmbed()

        if(args[0] == undefined){
            embed.setColor('RANDOM')
	        .setTitle(':book: HISTOBOT |HELP')
	        .setAuthor('HistoBot', 'https://i.kym-cdn.com/photos/images/original/001/464/390/36d.jpg')
	        .setDescription('The prefix is `|`, write |help <command-name> for command information ')
	        .setThumbnail('https://i.kym-cdn.com/photos/images/original/001/464/390/36d.jpg')
            .addField('History Knowledge', '`today-events`, `today-births`, `today-deaths`, `search-events`, `search-births`, `search-deaths`,', false)
            .addField('COVID-19 Information', '`covid-global`, `covid-country`', false)
            .addField('Fun', '`gulag`, `medal`, `say`, `shout`', false)
            .addField('Misc', '`palindrome`, `romanum`, `caesar-ciphers`, `announce`', false)
            .addField('Utility', '`ping`, `bug-report`', false)
            .addField('Developer Only', '`status`, `bot-stats`, `uptime`, \n Commands that were still in testing: `meme`', false)
            .setTimestamp()
            .setFooter('Brought To You By HistoBot');
        }else if(args.length > 0){
            let commandName = args[0];
            const command = require(`./${commandName}.js`);

            embed.setColor('RANDOM')
	        .setTitle(':book: HISTOBOT |HELP')
	        .setAuthor('HistoBot', 'https://i.kym-cdn.com/photos/images/original/001/464/390/36d.jpg')
            .setDescription(`${command.description}`)
            .addField('Usage', `${command.usage}`, true)
            .addField('Example', `${command.example}`, true)
            .setFooter('Brought To You By HistoBot');
            console.log(command);
        } else{
            message.channel.send("I can't find the command")
        }
        

        message.channel.send(embed);
    }
}