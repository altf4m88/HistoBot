const pagination = require('../node_modules/discord.js-pagination');
const fetch = require("node-fetch");
const APIURL = require("../config.json").COVID_URL;
const today = new Date;

module.exports = {
    name: 'covid-global',
    description: 'Give information for global new covid-19 cases',
    usage:'|covid-global',
    example: '|covid',
    execute(Discord, message){
        if(message.author.id !== "439976892343517184") return message.channel.send("Nope, you're not my master");
        
        fetch(`${APIURL}/summary`)
        .then(response => response.json())
        .then(json => {
            


            console.log(json.Global)
        })
        .catch(err => console.error(err));
        ;

    }

}