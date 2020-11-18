module.exports = {
    name: 'shout',
    description: 'Shout something',
    usage:'|shout <text-to-shout>',
    example: '|shout for the motherland uraa!',
    execute(message, args){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("I DON'T HAVE PERMISSION TO SHOUT");
        if(args.join(" ") == '') return message.channel.send("WHAT SHOULD I SHOUT?");

        message.delete()
        message.channel.send(args.join(" ").toUpperCase())
    }
}