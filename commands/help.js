const Discord = require("../node_modules/discord.js");

module.exports = {
    name: 'help',
    description: 'display command list',
    execute(message){
        const embed = new Discord.MessageEmbed()
        .setColor('LIME')
	    .setTitle(':book: HISTOBOT |HELP')
	    .setAuthor('HistoBot', 'https://i.kym-cdn.com/photos/images/original/001/464/390/36d.jpg')
	    .setDescription('Here are the commands that i currently supported, the prefix is `|` ')
	    .setThumbnail('https://i.kym-cdn.com/photos/images/original/001/464/390/36d.jpg')
        .addField('History Knowledge', '`today-events`, `today-births`, `today-deaths`', false)
        .addField('Fun', '`gulag`, `medal`', false)
        .addField('Utility', '`ping`', false)
        .addField('Developer Only', '`introduce`, `status`, \n Commands that were still in testing: `announce`, `good-comrade` ', false)
        .setTimestamp()
        .setFooter('Brought To You By HistoBot');


        message.channel.send(embed);
    }
}