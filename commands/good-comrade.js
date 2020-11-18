module.exports = {
    name: 'good-comrade',
    description: 'be a nice bot',
    usage:'|good-comrade',
    example: '|good-comrade',
    execute(message){
        if(message.author.id !== "439976892343517184") return message.channel.send("Nope, you're not my master");

        message.channel.send("nothing")
    }
}