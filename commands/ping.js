module.exports = {
    name: 'ping',
    description: 'this is ping',
    execute(message, args){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`This message had a latency of ${timeTaken}ms.`);
    }
}