const { MessageEmbed } = require("discord.js")

module.exports = {
    category: 'Testing',
    description: 'Replies with Embed', // Required for slash commands

    slash: 'both', // Create both a slash and legacy command
    testOnly: true, // Only register a slash command for the testing guilds
    permissions: ['ADMINISTRATOR'],
    callback: ({ message, interaction, text }) => {
        const embed = new MessageEmbed().setTitle('Hello User').setColor('#ffbb33').setAuthor({
            name: 'Kiatikhun',
            url: 'https://github.com/Kiattikhun-W'
        }).setImage('https://www.techtalkthai.com/wp-content/uploads/2020/08/freepik-logo.jpg')
        return embed

    },
}