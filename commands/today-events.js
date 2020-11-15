const Discord = require("../node_modules/discord.js")
const pagination = require('../node_modules/discord.js-pagination');
const fetch = require("node-fetch");
const APIURL = require("../config.json").BASEURL;
const today = new Date;

module.exports = {
    name: 'today-events',
    description: 'Give information on today historical event',
    execute(message){
        const pages = [];
        let fieldsArr = [];

        const setEmbedsMisc = (embed) => {
            embed
            .setTitle(`Today Events In History`)
            .setColor('RED')
            .setDescription(`\`Some Were Destined To Change The World, Brought To You By HistoBot ('-')7\``)
        }

        const setField = (eventData) => {
                let limit = 10;
                let tempBeds = new Discord.MessageEmbed();
                setEmbedsMisc(tempBeds);


                for(let x = 0; x < eventData.length; x++){
                    tempBeds.addField(`${eventDate} ${eventData[x].year}`, `${eventData[x].text}`, false);
                    
                    if(x == limit){
                        fieldsArr.push(tempBeds.fields)
                        pages.push(tempBeds);
                        tempBeds.fields = []
                        tempBeds = new Discord.MessageEmbed();
                        setEmbedsMisc(tempBeds);

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
        .then(json => setField(json.data.Events, json.date))
        .then(() => {

            for(let i = 0; i < fieldsArr.length; i++){
                pages[i].fields = fieldsArr[i]; 
            }
            
            const emojiList = ["⏪", "⏩"];
            const timeout = '120000';
            pagination(message, pages, emojiList, timeout)
        })
        .catch(e => console.log(e));


    }
}