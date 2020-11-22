module.exports = {
    name: 'caesar-ciphers',
    description: 'make a secret encrypted message',
    usage:'|caesar-ciphers <text-to-encrypt>',
    example: '|caesar-ciphers ATTACK ON TITAN',
    execute(Discord, message, args){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("I don't have permission to speak that");
        if(args.join(" ") == '') return message.channel.send("What should i cipher?");

        const rot13 = (str) => {
            let charArr = str.split("");
            let regex = /[A-Za-z]/;
            let result = "";
            let shift = 13;
            let tempLetter;
            let dec;
          
            charArr.forEach((i) => {
              if(regex.test(i)){
                dec = i.charCodeAt();
                
                if(dec < 78){
                  tempLetter = String.fromCharCode(dec + shift);
                } else if (dec <= 90){
                  tempLetter = String.fromCharCode(dec - shift);
                } else if(dec < 110){
                  tempLetter = String.fromCharCode(dec + shift);
                } else{
                  tempLetter = String.fromCharCode(dec - shift);
                }
                result += tempLetter;
              } else{
                result += i;
              }
              
            })
          
            return result;
        }

        let result = rot13(args.join(" "))

        const embed = new Discord.MessageEmbed()
        .setTitle('Caesar Cipher')
        .setColor('RANDOM')
        .addField('Result', ` \`\`\` ${result} \`\`\`\ `, false);
        ;

        return message.channel.send(embed);
    }

}