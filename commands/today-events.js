const pagination = require('../node_modules/discord.js-pagination');
const fetch = require("node-fetch");
const APIURL = require("../config.json").BASEURL;
const today = new Date;

module.exports = {
    name: 'today-events',
    description: 'List of historical events today',
    usage: '|today-events',
    example: '|today-events',
    execute(Discord, message){
        const pages = [];
        let fieldsArr = [];

        const setEmbedsMisc = (embed) => {
            embed
            .setTitle(`Today Events In History`)
            .setColor('RANDOM')
            .setDescription(`Events That Shaped The World Today, Brought To You By HistoBot ('-')7`)
        }

        const setField = (eventData, eventDate) => {
                let limit = 10;
                let tempBeds = new Discord.MessageEmbed();
                let dateArray = eventDate.split(" ");
                setEmbedsMisc(tempBeds);


                for(let x = 0; x < eventData.length; x++){
                    tempBeds.addField(`${dateArray[1]} ${dateArray[0]} ${eventData[x].year}`, `${eventData[x].text}`, false);
                    
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
            const timeout = '300000';
            pagination(message, pages, emojiList, timeout)
        })
        .catch(e => {
            console.log(e)
            message.channel.send("No data found, please check your date and months");
        });


    }
}