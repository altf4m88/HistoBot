const pagination = require('../node_modules/discord.js-pagination');
const fetch = require("node-fetch");
const APIURL = require("../config.json").BASEURL;
const today = new Date;

module.exports = {
    name: 'covid-country',
    description: 'Give COVID-19 cases information of specific countries',
    usage:'|covid-country <country-slug> OR |covid-country (With no arguments to show country slug info)',
    example: '|covid-country indonesia',
    execute(Discord, message, args){
        if(message.author.id !== "439976892343517184") return message.channel.send("Nope, you're not my master");
        //https://api.covid19api.com/countries
        //https://api.covid19api.com/country/
        let pages = [];
        let fieldsArr = [];
        let country = args.join(" ");
        
        const setCountryEmbedsMisc = (embed) => {
            embed
            .setTitle(`List of Available Country Data`)
            .setColor('RANDOM')
            .setDescription(`Use |covid-country <country-slug> to request the data`)
        }

        const setCountryField = (covidData) => {
                let limit = 10;
                let tempBeds = new Discord.MessageEmbed();
                setCountryEmbedsMisc(tempBeds);


                for(let x = 0; x < covidData.length; x++){
                    tempBeds.addField(`:flag_${covidData[x].ISO2.toLowerCase()}: ${covidData[x].Country}`, `Slug: ${covidData[x].Slug}`, false);
                    
                    if(x == limit){
                        fieldsArr.push(tempBeds.fields)
                        pages.push(tempBeds);
                        tempBeds.fields = []
                        tempBeds = new Discord.MessageEmbed();
                        setCountryEmbedsMisc(tempBeds);

                        limit += 10;
                    } else if(limit >= covidData.length){
                        if(x == covidData.length - 1){
                            pages.push(tempBeds);
                        }
                    }
                }
            }

        if(!country){
            fetch('https://api.covid19api.com/countries')
            .then(response => response.json())
            .then(json => setCountryField(json))
            .then(() => {
                for(let i = 0; i < fieldsArr.length; i++){
                    pages[i].fields = fieldsArr[i]; 
                }
                
                const emojiList = ["⏪", "⏩"];
                const timeout = '600000';
                pagination(message, pages, emojiList, timeout)
            })
            .catch(err => {
                console.log(err);
                return message.channel.send('Error, the API did not respond')
            })
        }

    }

}