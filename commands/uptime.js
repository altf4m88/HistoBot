module.exports = {
    name: 'uptime',
    description: 'show bot uptime',
    usage:'|uptime',
    example: '|uptime',
    execute(client, Discord, message){
        if(message.author.id !== process.env.DEVELOPER_ID) return message.channel.send("Nope, you're not my developer");

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

        let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .addField('Uptime :' , ` \`\`\` ${parseDur(client.uptime)} \`\`\` `, false)
        .setTimestamp()

        message.channel.send(embed);
    }
}