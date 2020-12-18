const SUBREDDIT = require("../config.json").MEME_URL;
const got = require("got");


module.exports = {
    name: 'history-meme',
    description: 'Give random meme from /r/HistoryMemes',
    usage:'|history-meme',
    example: '|history-meme',
    execute(Discord, message){
        const embed = new Discord.MessageEmbed();
        got(SUBREDDIT)
		.then(response => {
			const content = JSON.parse(response.body);
			const post = content.data.children[0];

			const permalink = post.data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = post.data.url;
			const memeTitle = post.data.title;
			const memeUpvotes = post.data.ups;
			const memeNumComments = post.data.num_comments;

			embed.setTitle(`${memeTitle}`);
			embed.setURL(`${memeUrl}`);
			embed.setColor('RANDOM');
			embed.setImage(memeImage);
			embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

			message.channel.send(embed);
        
        })
    }
}