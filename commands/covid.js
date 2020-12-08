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
        fetch(`${APIURL}/summary`)
        .then(response => response.json())
        .then(json => {
            let {NewConfirmed, TotalConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered} = json.Global;

            const embed = new Discord.MessageEmbed()
            .setTitle('Global COVID-19 Information 📊')
            .setAuthor('HistoBot', 'https://i.kym-cdn.com/photos/images/original/001/464/390/36d.jpg')
            .addField('Total Confirmed 🏥',` \`\`\` ${TotalConfirmed} \`\`\` `, true)
            .addField('Total Deaths ☠️',` \`\`\` ${TotalDeaths} \`\`\``, true)
            .addField('Total Recovered ⚕️',` \`\`\` ${TotalRecovered} \`\`\``, true)
            .addField('New Confirmed 📈', ` \`\`\` ${NewConfirmed} \`\`\`\ `, true)
            .addField('New Deaths 💀', ` \`\`\` ${NewDeaths} \`\`\`\ `, true)
            .addField('New Recovered 🧍', ` \`\`\` ${NewRecovered} \`\`\`\ `, true);
            
            message.channel.send(embed);
        })
        .catch(err => {
            console.error(err);
        });
    }
}