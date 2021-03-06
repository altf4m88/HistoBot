const mdf = require('moment-duration-format');
const moment = require('moment');
const os = require('os');
const cpuStat = require('cpu-stat');
const ms = require('ms');

module.exports = {
    name: 'bot-stats',
    description: 'show bot server, usage and physical statistics',
    usage:'|bot-stats',
    example: '|bot-stats',
    execute(Discord, client, message){
        if(message.author.id !== process.env.DEVELOPER_ID) return message.channel.send("Nope, you're not my master");
        const formatBytes = (a, b) => {
            if(a == 0) return "0 Bytes";

            let c = 1024;
            let d = b || 2;
            let e = ["B", "KB", "MB", "TB"];
            let f = Math.floor(Math.log(a) / Math.log(c));
            return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
        }

        const parseDur = (ms) => {
            let seconds = ms/1000;
            let days = parseInt(seconds/86400);
            seconds = seconds % 86400;

            let hours = parseInt(seconds / 3600);
            seconds = seconds % 3600;

            let minutes = parseInt(seconds / 60);
            seconds = parseInt(seconds % 60);

            if(days) {
                return `${days} day, ${hours} hour, ${minutes} minutes`;
            } else if (hours){
                return `${hours} hour, ${minutes} minutes, ${seconds} seconds`;
            } else if(minutes){
                return `${minutes} minutes, ${seconds} seconds`;
            } else {
                return `${seconds} seconds`;
            }
        }

        cpuStat.usagePercent( (err, percent, seconds) => {
            if(err){
                return console.error(err);
            }
            const cores = os.cpus().length;
            const cpuModel = os.cpus()[0].model;
            const guild = client.guilds.cache.size.toLocaleString();
            const user = client.users.cache.size.toLocaleString();
            const channel = client.channels.cache.size.toLocaleString();
            const usage = formatBytes(process.memoryUsage().heapUsed);
            const Node = process.version;
            const CPU = percent.toFixed(2);

            const embed = new Discord.MessageEmbed()
            .setTitle('HistoBot Statistics')
            .setAuthor('HistoBot', 'https://i.kym-cdn.com/photos/images/original/001/464/390/36d.jpg')
            .addField('Server Stats', ` \`\`\` Server: ${guild} \n User: ${user} \n Channel: ${channel} \`\`\`\ `, true)
            .addField('Bot Usage', ` \`\`\` Usage: ${usage} \n Node Version: ${Node} \n CPU Usage: ${CPU}% \`\`\`\ `, true)
            .addField('Physical Stats:',` \`\`\` CPU: ${cores} - ${cpuModel} \`\`\` `, false)
            .addField('Uptime:',` \`\`\` ${parseDur(client.uptime)} \`\`\``, false);

            message.channel.send(embed);

        });
    }
}