const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

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
            name: "Use |help for help Comrade!"
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
            client.commands.get('ping').execute(message, args);
            break;
        case("introduce"):
            client.commands.get('introduce').execute(message, args);
            break;
        case("status"):
            client.commands.get('status').execute(client, message, args);
            break;
        case("today-events"):
            client.commands.get('today-events').execute(message);
            break;
        case("today-births"):
            client.commands.get('today-births').execute(message);
            break;
        case("today-deaths"):
            client.commands.get('today-deaths').execute(message);
            break;
        case("good-comrade"):
            client.commands.get('good-comrade').execute(message, args);
            break;
        case("gulag"):
            client.commands.get('go-to-gulag').execute(message, args);
            break;
        case("announce"):
            client.commands.get('announce').execute(client, message, args);
            break;
        case("medal"):
            client.commands.get('medal').execute(client, message, args);
            break;
        case("help"):
            client.commands.get('help').execute(message);
            break;
        case("say"):
            client.commands.get('say').execute(message, args);
            break;
        case("shout"):
            client.commands.get('shout').execute(message, args);
            break;
    }    
    
})




client.login(config.BOT_TOKEN);