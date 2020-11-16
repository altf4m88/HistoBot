module.exports = {
    name: 'say',
    description: 'say something',
    execute(message, args){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("I don't have permission to speak that");
        if(args.join(" ") == '') return message.channel.send("What should i say?");

        message.delete()
        message.channel.send(args.join(" "))
    }
}