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
            let prevIndex = null;
            let index = Math.floor(Math.random() * 25) - 1;
            while(index == prevIndex){
                index = Math.floor(Math.random() * 25) - 1;
            }
            prevIndex = index;
            const post = content.data.children[index];

			const permalink = post.data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = post.data.url;
			const memeTitle = post.data.title;
            const memeUpvotes = post.data.ups;
            const memeDownvotes = post.data.downs;
			const memeNumComments = post.data.num_comments;

            embed.setTitle(`${memeTitle}`);
            embed.setDescription('From /r/HistoryMemes');
			embed.setURL(`${memeUrl}`);
			embed.setColor('RANDOM');
			embed.setImage(memeImage);
			embed.setFooter(`🔼 ${memeUpvotes} 🔽${memeDownvotes} 💬 ${memeNumComments}`);

			message.channel.send(embed);
        
        })
    }
}