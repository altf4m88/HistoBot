const pagination = require('../node_modules/discord.js-pagination');
const fetch = require("node-fetch");
const APIURL = require("../config.json").BASEURL;

module.exports = {
    name: 'search-births',
    description: 'List of historical figure born on searched date',
    usage:'|search-births <date> <months>',
    example: '|search-births 3 1',
    execute(Discord, message, args){
        const pages = [];
        let fieldsArr = [];

        const setEmbedsMisc = (embed, date) => {
            let dateArray = date.split(" ");

            embed
            .setTitle(`Historical Figure Born On ${dateArray[1]} ${dateArray[0]}`)
            .setColor('RANDOM')
            .setDescription(`Some Were Destined To Change The World, Brought To You By HistoBot ('-')7`)
        }

        const setField = (eventData, eventDate) => {
            
                let limit = 10;
                //initialize the embed
                let tempBeds = new Discord.MessageEmbed()
                setEmbedsMisc(tempBeds, eventDate);


                for(let x = 0; x < eventData.length; x++){
                    tempBeds.addField(`Year ${eventData[x].year}`, `${eventData[x].text}`, false);
                    
                    if(x == limit){
                        fieldsArr.push(tempBeds.fields)
                        pages.push(tempBeds);
                        //reinitialize the embed
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
        .then(json => setField(json.data.Births, json.date))
        .then(() => {

            for(let i = 0; i < fieldsArr.length; i++){
                pages[i].fields = fieldsArr[i]; 
            }
            
            const emojiList = ["⏪", "⏩"];
            const timeout = '360000';
            pagination(message, pages, emojiList, timeout)
        })
        .catch(e => {
            console.log(e)
            message.channel.send("No data found, please check your date and months");
        });

    }
}
