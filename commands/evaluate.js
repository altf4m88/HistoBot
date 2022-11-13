const math = require("mathjs");

module.exports = {
    name: 'evaluate',
    description: 'evaluate given expression',
    usage:'|evaluate <expression>',
    example: '|evaluate sqrt(25)',
    execute(Discord, message, args){
        if(args.join(" ") == '') return message.channel.send("Give me the expression");

        let footerMessage = [
            'I hate math too, you know...',
            'That would be $5 sir... just kidding',
            "Now i'll report to your teacher that you're cheating",
            "That's your homework, right? hehe",
            'eins zwei, polizei. drei vier, grenadier.',
            "Now if you excuse me, i've got a Kampfgruppe to command",
            "You are now under surveillance of BIN, FBI and KGB, tukang bakso currently circling your home",
        ];
        let messageIndex = Math.floor(Math.random() * 6) - 1;

        try {
            let expression = args.join(" ");
            let result = math.compile(expression).evaluate();

            if (typeof result == 'object') {
                if (result.constructor.name == 'DenseMatrix') {
                    result = `Result: ${JSON.stringify(result._data)}, Size: ${JSON.stringify(result._size)}`;
                } else {
                    result = JSON.stringify(result);
                }
            }

            const embed = new Discord.MessageEmbed()
                .setTitle('Evaluation')
                .setColor('RANDOM')
                .addField("Expression:" , ` \`\`\` ${expression} \`\`\`\ `, false)
                .addField("Result:" , ` \`\`\` ${result} \`\`\`\ `, false)
                .setFooter(footerMessage[messageIndex]);

            return message.channel.send(embed);
        } catch (err) {
            console.log(err);
            return message.channel.send('Problem with the expression : ' + err.message);
        }
    }

}

