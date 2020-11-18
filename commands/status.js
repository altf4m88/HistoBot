module.exports = {
    name: 'status',
    description: 'Update the bot status',
    usage: '|status <status-text>',
    example: '|status reclaiming the holy land',
    execute(client, message, args){
        if(message.author.id !== "439976892343517184") return message.channel.send("Nope, you're not my master");

        let statusStr = '';
        for(text of args){
            statusStr += `${text} `
        }
        client.user.setPresence({
            activity: {
                name: statusStr,
                type: 0
            }
        })

        message.channel.send("Bot status updated comrade!")
    }
}