const Discord = require("../node_modules/discord.js")
const pagination = require('../node_modules/discord.js-pagination');
const fetch = require("node-fetch");
const APIURL = require("../config.json").BASEURL;
const today = new Date;

module.exports = {
    name: 'today-deaths',
    description: 'Give information on historical figure deaths',
    execute(message){
        const pages = [];
        let fieldsArr = [];

        const setField = (eventData, eventDate) => {
                let limit = 10;
                let tempBeds = new Discord.MessageEmbed()
                .setTitle(`Historical Figure Died On ${eventDate}`)
                .setColor('#FFF')
                .setDescription(`\`Requiescat im pace, Brought To You By HistoBot ('-')7\``)

                for(let x = 0; x < eventData.length; x++){
                    tempBeds.addField(`Year ${eventData[x].year}`, `${eventData[x].text}`, false);
                    
                    if(x == limit){
                        fieldsArr.push(tempBeds.fields)
                        pages.push(tempBeds);
                        tempBeds.fields = []
                        tempBeds = new Discord.MessageEmbed()
                        .setTitle(`Historical Figure Died On ${eventDate}`)
                        .setColor('#FFF')
                        .setDescription(`\`Requiescat im pace, Brought To You By HistoBot ('-')7\``)

                        limit += 10;
                    } else if(limit >= eventData.length){
                        if(x == eventData.length - 1){
                            pages.push(tempBeds);
                        }
                    }
                }
            }
        


        let date = today.getDate();
        let month = today.getMonth()+1;
        
  
        fetch(`${APIURL}/date/${month}/${date}`)
        .then(response => response.json())
        .then(json => setField(json.data.Births, json.date))
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
