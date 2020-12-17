const got = require("got");
const APIURL = require("../config.json").MEME_URL;

module.exports = {
    name: 'history-meme',
    description: 'Give random meme from /r/HistoryMemes',
    usage:'|history-meme',
    example: '|history-meme',
    execute(Discord, message){
        const embed = new Discord.MessageEmbed()
        got(`${APIURL}/random/.json`)
        .then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
            message.channel.send(embed);
        })
    }
}