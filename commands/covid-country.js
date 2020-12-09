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
        let country = args.join(" ");
        
        const setCountryEmbedsMisc = (embed) => {
            embed
            .setTitle(`List of Available Country Data`)
            .setColor('RANDOM')
            .setDescription(`Use the slug to request the COVID-19 information from specific countries, |covid-country <country-slug>`)
        }

        const setCountryField = (covidData) => {
                let limit = 50;
                let tempBeds = new Discord.MessageEmbed();
                setEmbedsMisc(tempBeds);


                for(let x = 0; x < eventData.length; x++){
                    tempBeds.addField(`${covidData[x].Country} :flag_${covidData[x].ISO2}:`, `Slug: ${covidData[x].Slug}`, false);
                    
                    if(x == limit){
                        fieldsArr.push(tempBeds.fields)
                        pages.push(tempBeds);
                        tempBeds.fields = []
                        tempBeds = new Discord.MessageEmbed();
                        setEmbedsMisc(tempBeds);

                        limit += 50;
                    } else if(limit >= eventData.length){
                        if(x == eventData.length - 1){
                            pages.push(tempBeds);
                        }
                    }
                }
            }

        if(!country){

            

            console.log("no country")
        }

    }

}