require('dotenv').config();

const Discord = require("discord.js");
const fs = require("fs");
const http = require('http');

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


client.on("message", (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();

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
    }    
    
})




client.login(process.env.BOT_TOKEN);