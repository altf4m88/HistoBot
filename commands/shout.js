module.exports = {
    name: 'shout',
    description: 'shout something',
    execute(message, args){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("I DON'T HAVE PERMISSION TO SHOUT");
        if(args.join(" ") == '') return message.channel.send("WHAT SHOULD I SHOUT?");

        message.delete()
        message.channel.send(args.join(" ").toUpperCase())
    }
}