const Discord = require("../node_modules/discord.js");

module.exports = {
    name: 'introduce',
    description: 'let the bot introduce itself',
    execute(message){
        if(message.author.id !== "439976892343517184") return message.channel.send("Nope, you're not my master");
        const embed = new Discord.MessageEmbed()
        .setTitle('Let Me Introduce Myself')
        .addField(`I am HistoBot`, `I'll provide you with daily dose of history knowledge. For now, i'm small and weak. But my master will lead me to glory and soon, i'll be able to restore the Soviet Union ☭`, false)
        .setFooter(`Historia magistra vitae est ('-')/`)
        .setColor('#FFF')

        message.channel.send(embed)
    }
}