module.exports = {
    name: 'romanum',
    description: 'convert decimal to roman numerals',
    usage:'|romanum <decimalnum>',
    example: '|romanum 69',
    execute(Discord, message, args){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("I don't have permission to speak that");
        if(parseInt(args[0]) == NaN) return message.channel.send("That's not a number");
        if(args.join(" ") == '') return message.channel.send("Give me number");

        const convertToRoman = (num) => {
            let decimalArr = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
            let romanArr = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
            let romanum = "";

            for(let i = 0; i < decimalArr.length; i++){
                while(decimalArr[i] <= num){
                    romanum += romanArr[i];
                    num -= decimalArr[i];
                }
            }

            return romanum;
        }

        let decimalNum = parseInt(args[0]);
        let romanNum = convertToRoman(decimalNum);
        const embed = new Discord.MessageEmbed()
        .setTitle('Convert To Roman Numeral')
        .setColor('RANDOM')
        .addField("Result:" , ` \`\`\` ${romanNum} \`\`\`\ `, false)
        .setFooter("Brought To You By HistoBot ('-')7");

        return message.channel.send(embed);
    }

}
