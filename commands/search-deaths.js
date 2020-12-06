const pagination = require('../node_modules/discord.js-pagination');
const fetch = require("node-fetch");
const APIURL = require("../config.json").BASEURL;

module.exports = {
    name: 'search-deaths',
    description: 'List of historical figure died on searched date',
    usage:'|search-deaths <date> <months>',
    example: '|search-deaths 4 10',
    execute(Discord, message, args){
        const pages = [];
        let fieldsArr = [];

        const setEmbedsMisc = (embed, date) => {
            let dateArray = date.split(" ");

            embed
            .setTitle(`Historical Figure Died On ${dateArray[1]} ${dateArray[0]}`)
            .setColor('RANDOM')
            .setDescription(`Requiescat im pace, Brought To You By HistoBot ('-')7`)
        }

        const setField = (eventData, eventDate) => {
                let limit = 10;
                let tempBeds = new Discord.MessageEmbed()
                setEmbedsMisc(tempBeds, eventDate);

                for(let x = 0; x < eventData.length; x++){
                    tempBeds.addField(`Year ${eventData[x].year}`, `${eventData[x].text}`, false);
                    
                    if(x == limit){
                        fieldsArr.push(tempBeds.fields)
                        pages.push(tempBeds);
                        tempBeds.fields = []
                        tempBeds = new Discord.MessageEmbed()
                        setEmbedsMisc(tempBeds, eventDate);

                        limit += 10;
                    } else if(limit >= eventData.length){
                        if(x == eventData.length - 1){
                            pages.push(tempBeds);
                        }
                    }
                }
            }
        

        let date = args[0];
        let month = args[1];
        
  
        fetch(`${APIURL}/date/${month}/${date}`)
        .then(response => response.json())
        .then(json => setField(json.data.Deaths, json.date))
        .then(() => {

            for(let i = 0; i < fieldsArr.length; i++){
                pages[i].fields = fieldsArr[i]; 
            }
            
            const emojiList = ["⏪", "⏩"];
            const timeout = '600000';
            pagination(message, pages, emojiList, timeout)
        })
        .catch(e => {
            console.log(e)
            message.channel.send("No data found, please check your date and months");
        });

    }
}
