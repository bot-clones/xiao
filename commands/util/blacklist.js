const { Command } = require('discord.js-commando');

module.exports = class BlacklistCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'blacklist',
			aliases: ['blacklist-add'],
			group: 'util',
			memberName: 'blacklist',
			description: 'Blacklists a user from using commands.',
			ownerOnly: true,
			args: [
				{
					key: 'user',
					prompt: 'What user do you want to blacklist?',
					type: 'user'
				}
			]
		});
	}

	run(msg, { user }) {
		if (this.client.isOwner(msg.author)) return msg.reply('The bot owner cannot be blacklisted.');
		if (user.bot) return msg.reply('Bots cannot be blacklisted.');
		const blacklist = this.client.provider.get('global', 'blacklist', []);
		if (blacklist.includes(user.id)) return msg.reply(`${user.tag} is already blacklisted!`);
		blacklist.push(blacklist.id);
		this.client.provider.set('global', 'blacklist', blacklist);
		return msg.say(`${user.tag} has been blacklisted.`);
	}
};
