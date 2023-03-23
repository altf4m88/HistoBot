const fetch = require("node-fetch");
const APIURL = require("../config.json").ISLAMIC_URL;
const pagination = require('../node_modules/discord.js-pagination');
const moment = require("moment");

module.exports = {
    name: 'prayer-schedule',
    description: 'Give information about prayer schedule',
    usage:'|prayer-schedule <city_name> <date (optional)>',
    example: '|prayer-schedule ',
    async execute(Discord, message, args){

        // const isValidDate = (date) => {
        //     return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
        // }
        
        // if (args[0] == undefined){
        //     let pages = [];
        //     let fieldsArr = [];

        //     const setCityEmbedsMisc = (embed) => {
        //         embed
        //         .setTitle(`Available City Name and Id`)
        //         .setColor('RANDOM')
        //         .setDescription(`Use |prayer-schedule <city_name> to request the data`)
        //     }
    
        //     const setCityField = (cityData) => {
        //             let limit = 10;
        //             let tempBeds = new Discord.MessageEmbed();
        //             setCityEmbedsMisc(tempBeds);
    
    
        //             for(let x = 0; x < cityData.length; x++){
        //                 tempBeds.addField(`${cityData[x].lokasi}`, "id: `"+ cityData[x].id +"`", false);
                        
        //                 if(x == limit){
        //                     fieldsArr.push(tempBeds.fields)
        //                     pages.push(tempBeds);
        //                     tempBeds.fields = []
        //                     tempBeds = new Discord.MessageEmbed();
        //                     setCityEmbedsMisc(tempBeds);
    
        //                     limit += 10;
        //                 } else if(limit >= cityData.length){
        //                     if(x == cityData.length - 1){
        //                         pages.push(tempBeds);
        //                     }
        //                 }
        //             }
        //     }

        //     fetch(`${APIURL}/sholat/kota/semua`)
        //         .then(response => response.json())
        //         .then(json => setCityField(json))
        //         .then(() => {
        //             for(let i = 0; i < fieldsArr.length; i++){
        //                 pages[i].fields = fieldsArr[i]; 
        //             }
                    
        //             const emojiList = ["⏪", "⏩"];
        //             const timeout = '600000';
        //             pagination(message, pages, emojiList, timeout)
        //         })
        //         .catch(err => {
        //             console.log(err);
        //             return message.channel.send('Error, the API did not respond')
        //         })

        //     return;
        // }


        const getDateArgs = (args) => {
            let dateArg = {
                date : moment(),
                index : null,
            };
            args.forEach((item, index) => {
                let dateItem = moment(item, 'DD-MM-YYYY');

                if (dateItem.isValid()) {
                    dateArg.date = dateItem;
                    dateArg.index = index;
                }
            })

            return dateArg;
        }

        const getCityArgs = (args, dateIndex) => {
            if (dateIndex === null) {
                return args.join(' ');
            }

            return args.slice(0, dateIndex).join(' ');
        }

        let dateArg = getDateArgs(args);
        let cityName = getCityArgs(args, dateArg.index);
        let cityData = {id : 1204, name: 'Kabupaten Bogor'} //default id of Kab. Bogor;

        if (cityName) {
            cityData = await fetch(`${APIURL}/sholat/kota/cari/${cityName}`)
                .then(response => response.json())
                .then(json => {
                    if (json.status === false) {
                        return 404;
                    }

                    return {id : json.data[0].id, name: json.data[0].lokasi};
                })
                .catch(err => {
                    console.error(err);
                    return message.channel.send("Error, looks like the API didn't respond");
                });
        }

        if (cityData === 404) {
            return message.channel.send("City not found");
        }

        let apiDate = dateArg.date;
        let year = apiDate.year();
        let month = apiDate.format('MM');
        let date = apiDate.date();
        let day = apiDate.locale('id').format('dddd');

        fetch(`${APIURL}/sholat/jadwal/${cityData.id}/${year}/${month}/${date}`)
        .then(response => response.json())
        .then(json => {
            let {
                imsak,
                subuh,
                dzuhur,
                ashar,
                maghrib,
                isya
            } = json.data.jadwal;

            const embed = new Discord.MessageEmbed()
                .setTitle('☪️ Jadwal Sholat dan Imsakiyah ')
                .setAuthor('HistoBot', 'https://i.kym-cdn.com/photos/images/original/001/464/390/36d.jpg')
                .setDescription(`Wilayah ${cityData.name} dan sekitarnya - ${day}, ${date}/${month}/${year}`)
                .setThumbnail('https://img.freepik.com/free-vector/flat-hanging-lanterns-background_23-2148140119.jpg?w=2000')
                .addField('Imsak 🤐',` \`\`\` ${imsak} \`\`\` `, true)
                .addField('Subuh 📿',` \`\`\` ${subuh} \`\`\``, true)
                .addField('Dzuhur 🕌',` \`\`\` ${dzuhur} \`\`\``, true)
                .addField('Ashar 🤲', ` \`\`\` ${ashar} \`\`\`\ `, true)
                .addField('Maghrib 🥪', ` \`\`\` ${maghrib} \`\`\`\ `, true)
                .addField('Isya 🌙', ` \`\`\` ${isya} \`\`\`\ `, true)
                .setColor('RANDOM')
                .setFooter('Selamat menunaikan ibadah puasa! 🙏🏻');

            message.channel.send(embed);
        })
        .catch(err => {
            console.error(err);
            message.channel.send("Error, looks like the API didn't respond");
        });
    }
}