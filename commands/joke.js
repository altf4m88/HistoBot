const { default: fetch } = require("node-fetch");
const APIURL = require("../config.json").JOKES_URL;

module.exports = {
    name: 'joke',
    description: 'Give a random joke, you can select the category (random, general, programming)',
    usage: '|joke <random | general | programming | knock-knock>',
    example: '|joke programming',
    execute(Discord, message, args){
        let embed = new Discord.MessageEmbed();
        let type = args[0];

        if(type){
            fetch(`${APIURL}/jokes/${type}/random`)
            .then(response => response.json())
            .then(json => {
                let joke = json[0];

                embed.setTitle("Jokes")
                .setColor('RANDOM')
                .addField(`${joke.setup}` , ` \`\`\` *${joke.punchline}* \`\`\`\ `, false)
                .setFooter("I hope that's a good one");

                return message.channel.send(embed)
            })
            .catch(err => message.channel.send("no category found"));
        } else {
            fetch(`${APIURL}/random_joke`)
            .then(response => response.json())
            .then(joke => {
                embed.setTitle("Jokes")
                .setColor('RANDOM')
                .addField(`${joke.setup}` , ` \`\`\` *${joke.punchline}* \`\`\`\ `, false)
                .setFooter("You can select jokes from this category: General, Programming, Knock-Knock");

                return message.channel.send(embed)
            })
            .catch(err => message.channel.send("the api did not respond"));
        }

    }
}