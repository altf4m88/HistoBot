const Discord = require("../node_modules/discord.js")
const pagination = require('../node_modules/discord.js-pagination');
const fetch = require("node-fetch");
const APIURL = require("../config.json").BASEURL;

module.exports = {
    name: 'today-deaths',
    description: 'Give information on historical figure deaths',
    execute(message){
        const pages = [];
        let fieldsArr = [];

        const setEmbedsMisc = (embed, date) => {
            embed
            .setTitle(`Historical Figure Died On ${date}`)
            .setColor('GREY')
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
        

        const today = new Date;
        let date = today.getDate();
        let month = today.getMonth()+1;
        
  
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
        .catch(e => console.log(e));

    }
}
