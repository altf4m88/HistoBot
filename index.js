require('dotenv').config();

const Discord = require("discord.js");
const fs = require("fs");
const http = require('http');
const { env } = require('process');
const msgPool = require('./data/text-pool');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);

const client = new Discord.Client();
const prefix = "|";

client.commands = new Discord.Collection();
const commandFiles  = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

console.log(commandFiles);

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once("ready", () => {
    console.log("Jawohl herr Hauptsturmfuhrer!")
    client.user.setPresence({
        activity: {
            name: "|help for help Comrade!",
            type: "LISTENING"
        }
    })
})

client.on("message", async (message) => {
    if(message.author.bot) return;
    
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

    if (message.author.id === process.env.DEVELOPER_ID) {
        let messageContent = message.content;
        let filteringRegex = /[a-z0-9]/gi;
        let filteredStr = messageContent.toLowerCase().match(filteringRegex).join('') ?? '';

        switch(filteredStr){
            case ("bang"):
            case ("ngab"):
            case ("mang"):
            case ("summonajudan"):

                const filter = msg => msg.author.id == message.author.id;

                message.channel.send(randMsg(msgPool.respondMessage));

                message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        let content = collected.first().content.toLowerCase().match(filteringRegex).join('') ?? '';;
                        
                        switch(content){
                            case ("jadwalsolat"):
                            case ("yangbiasa"):
                            case ("biasalah"):
                            case ("bukajamberapa"):
                            case ("imsakkapan"):
                                message.reply(randMsg(msgPool.waitMessage))

                                return client.commands.get('prayer-schedule').execute(Discord, message, args);
                            case ("bukanlu"):
                            case ("bukanluwh"):
                            case ("luitugadiajak"):
                            case ("gamanggillu"):
                            case ("salahorang"):
                            case ("gajadi"):
                                message.reply(randMsg(msgPool.cancelMessage))
                        }
                    })
                    .catch(collected => message.reply(randMsg(msgPool.timeoutMessage)));
                return
            case("goodboy"):
                return message.channel.send('Danke herr Hauptsturmfuhrer!');
            case("sieg"):
                return message.channel.send('Heil!');
            case("achtung"):
                return message.channel.send('Jawohl herr Hauptsturmfuhrer!');
            case("danke"):
                return message.channel.send('Bitte schon herr Hauptsturmfuhrer!');
            case("hiphip"):
                return message.channel.send('Hurra!');
            case("zarodinu"):
                return message.channel.send('URRAAA!');
            case("feuerfrei"):
                return message.channel.send('Panzerkanone feuer!');
            case("ladpanzerammunition"):
                return message.channel.send('Sprenggranate laden!');
            case("takbir"):
                return message.channel.send('Allahu akbar!');
        }
    }

    if(!message.content.startsWith(prefix)) return;

    switch(command){
        case("ping"):
            client.commands.get('ping').execute(message);
            break;
        case("introduce"):
            client.commands.get('introduce').execute(message, args);
            break;
        case("status"):
            client.commands.get('status').execute(client, message, args);
            break;
        case("today-events"):
            client.commands.get('today-events').execute(Discord, message);
            break;
        case("today-births"):
            client.commands.get('today-births').execute(Discord, message);
            break;
        case("today-deaths"):
            client.commands.get('today-deaths').execute(Discord, message);
            break;
        case("search-events"):
            client.commands.get('search-events').execute(Discord, message, args);
            break;
        case("search-births"):
            client.commands.get('search-births').execute(Discord, message, args);
            break;
        case("search-deaths"):
            client.commands.get('search-deaths').execute(Discord, message, args);
            break;
        case("good-comrade"):
            client.commands.get('good-comrade').execute(message, args);
            break;
        case("gulag"):
            client.commands.get('gulag').execute(Discord, message, args);
            break;
        case("announce"):
            client.commands.get('announce').execute(Discord, message, args);
            break;
        case("medal"):
            client.commands.get('medal').execute(Discord, client, message, args);
            break;
        case("help"):
            client.commands.get('help').execute(Discord, message, args);
            break;
        case("say"):
            client.commands.get('say').execute(message, args);
            break;
        case("shout"):
            client.commands.get('shout').execute(message, args);
            break;
        case("palindrome"):
            client.commands.get('palindrome').execute(Discord, message, args);
            break;
        case("romanum"):
            client.commands.get('romanum').execute(Discord, message, args);
            break;
        case("caesar-ciphers"):
            client.commands.get('caesar-ciphers').execute(Discord, message, args);
            break;
        case("bot-stats"):
            client.commands.get('bot-stats').execute(Discord, client, message);
            break;
        case("covid-global"):
            client.commands.get('covid-global').execute(Discord, message);
            break;
        case("covid-country"):
            client.commands.get('covid-country').execute(Discord, message, args);
            break;
        case("bug-report"):
            client.commands.get('bug-report').execute(client, Discord, message, args);
            break;
        case("uptime"):
            client.commands.get('uptime').execute(client, Discord, message);
            break;
        case("history-meme"):
            client.commands.get('history-meme').execute(Discord, message);
            break;
        case("joke"):
            client.commands.get('joke').execute(Discord, message, args);
            break;
        case("evaluate"):
            client.commands.get('evaluate').execute(Discord, message, args);
            break;
        case("prayer-schedule"):
            client.commands.get('prayer-schedule').execute(Discord, message, args);
            break;
    }    
    
})

const randMsg = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}


client.login(process.env.BOT_TOKEN);