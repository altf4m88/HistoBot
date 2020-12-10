const fetch = require("node-fetch");
const APIURL = require("../config.json").COVID_URL;
const today = new Date;

module.exports = {
    name: 'covid-global',
    description: 'Give information for global new covid-19 cases',
    usage:'|covid-global',
    example: '|covid-global',
    execute(Discord, message){
        fetch(`${APIURL}/summary`)
        .then(response => response.json())
        .then(json => {
            let {NewConfirmed, TotalConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered} = json.Global;
            let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            let year = today.getFullYear();
            let month = today.getMonth();
            let date = today.getDate();
            let day = today.getDay();

            const embed = new Discord.MessageEmbed()
            .setTitle('🌎 Global COVID-19 Information 🌏')
            .setAuthor('HistoBot', 'https://i.kym-cdn.com/photos/images/original/001/464/390/36d.jpg')
            .setDescription(`${dayNames[day]}, ${date}-${month}-${year}`)
            .addField('Total Confirmed 🏥',` \`\`\` ${TotalConfirmed} \`\`\` `, true)
            .addField('Total Deaths ☠️',` \`\`\` ${TotalDeaths} \`\`\``, true)
            .addField('Total Recovered ⚕️',` \`\`\` ${TotalRecovered} \`\`\``, true)
            .addField('New Confirmed 📈', ` \`\`\` ${NewConfirmed} \`\`\`\ `, true)
            .addField('New Deaths 💀', ` \`\`\` ${NewDeaths} \`\`\`\ `, true)
            .addField('New Recovered 🧍', ` \`\`\` ${NewRecovered} \`\`\`\ `, true)
            .setFooter('Stay safe Comrade! 😷');

            message.channel.send(embed);
        })
        .catch(err => {
            console.error(err);
            message.channel.send("Error, looks like the API didn't respond");
        });
    }
}