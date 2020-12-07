const pagination = require('../node_modules/discord.js-pagination');
const fetch = require("node-fetch");
const APIURL = require("../config.json").BASEURL;

module.exports = {
    name: 'covid-country',
    description: 'Give COVID-19 cases information of specific countries',
    usage:'|covid-country <country>',
    example: '|covid-country Indonesia',
    execute(Discord, message, args){
        if(message.author.id !== "439976892343517184") return message.channel.send("Nope, you're not my master");
    }

}