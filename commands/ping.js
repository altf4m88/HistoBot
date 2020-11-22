module.exports = {
    name: 'ping',
    description: 'ping command',
    usage:'|ping',
    example: '|ping',
    execute(message){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`This message had a latency of ${timeTaken}ms.`);
    }
}