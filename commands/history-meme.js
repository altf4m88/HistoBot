const SUBREDDIT = require("../config.json").SUBREDDIT;
const reddit = require("random-reddit");



module.exports = {
    name: 'history-meme',
    description: 'Give random meme from /r/HistoryMemes',
    usage:'|history-meme',
    example: '|history-meme',
    execute(Discord, message){

        let options = {
            imageOnly: true,
            allowNSFW: true
         };

        reddit.getPost(SUBREDDIT, options)
        .then(post => { //Make sure to change 'memes' with whatever subreddit you want

            console.log(post)
            let title = post.title;
            let content = post.text;
            let postURL = post.permalink;
            let postAuthor = post.author;
            let upvotes = post.upvotes;
            let downvotes = post.downvots;

            const embed = new Discord.MessageEmbed()
            .setTitle(`${title}`)
            .setURL(`${postURL}`)
            .setColor('RANDOM')
            .setFooter(`👍 ${upvotes} 👎 ${downvotes} 💬 `)

            message.channel.send(embed);
        })  
    }
}