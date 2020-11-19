const Discord = require("../node_modules/discord.js");

module.exports = {
    name: 'palindrome',
    description: 'check for palindrome',
    usage:'|palindrome <text-to-check>',
    example: '|palindrome racecar',
    execute(message, args){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("I don't have permission to speak that");
        if(args.join(" ") == '') return message.channel.send("Give me the words");

        const embed = new Discord.MessageEmbed()
        .setTitle('Palindrome Check');

        const palindrome = (str) => {
            //filter the string
            let filteringRegex = /[a-z0-9]/gi;
            let filteredStr = str.toLowerCase().match(filteringRegex);
            let result;

            //this function will be used to create a string from array
            const wordLoop = (array) => {
              let emptyString = "";
              for(let x = 0; x < array.length; x++){
                emptyString += array[x];
              }
              return emptyString;
            }
          
            //set the normal word
            let string1 = wordLoop(filteredStr);
            //set up the reversed word to be compared with string 1
            let string2 = wordLoop(filteredStr.reverse());
            //test the strings, return true or false
            result = string1 === string2 ? 'TRUE' : 'FALSE'; 

            embed
            .addField('String 1', ` \`\`\` ${string1} \`\`\`\ `, true)
            .addField('String 2', ` \`\`\` ${string2} \`\`\`\ `, true)
            .addField('Result', `${result}`, false);
          
            return message.channel.send(embed);
            
          }

        palindrome(args.join(" "))
    }
}