module.exports = {
    name: 'good-comrade',
    description: 'be a nice bot',
    execute(message){
        if(message.author.id !== "439976892343517184") return message.channel.send("Nope, you're not my master");

        message.channel.send("My boss spends 4 hours just to teach me how to make that message")
    }
}