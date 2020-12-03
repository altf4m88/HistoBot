const mdf = require('moment-duration-format');
const moment = require('moment');
const os = require('os');
const cpuStat = require('cpu-stat');
const ms = require('ms');

module.exports = {
    name: 'bot-stats',
    description: 'show bot statistics',
    usage:'|bot-stats',
    example: '|bot-stats',
    execute(bot, message){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`This message had a latency of ${timeTaken}ms.`);
    }
}