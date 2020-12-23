const { default: fetch } = require("node-fetch");
const APIURL = require("../config.json").JOKES_URL;

module.exports = {
    name: 'joke',
    description: 'Give a random joke, you can select the category (random, general, programming)',
    usage: '|joke <random | general | programming>',
    example: '|joke programming',
    execute(Discord, message, args){
        let embed = new Discord.MessageEmbed();
        let type = args[0];
        
        https://official-joke-api.appspot.com/jokes/programming/random

        if(type){
            fetch(``)


        }


        message.channel.send(embed)
    }
}