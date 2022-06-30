const { MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    category: 'Testing',
    description: 'Replies with Button',

    slash: true,
    testOnly: true,
    permissions: ['ADMINISTRATOR'],
    callback: async ({ interaction: msgInt, channel }) => {
        const row = new MessageActionRow().addComponents
            (
                new MessageButton()
                    .setCustomId('on_yes')
                    .setEmoji('✔')
                    .setLabel('Confirm')
                    .setStyle('SUCCESS')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('on_no')
                    .setEmoji('❌')
                    .setLabel('No')
                    .setStyle('DANGER')
            )
        const linkRow = new MessageActionRow().addComponents(new MessageButton().setURL('https://google.com').setLabel('Visit Google').setStyle('LINK'))
        await msgInt.reply({
            content: 'Are u sure?',
            components: [row, linkRow],
            ephemeral: true, // only who send the req can see
        })

        const filterUser = (btnInt) => {
            return msgInt.user.id === btnInt.user.id //check same user
        }

        const collector = channel.createMessageComponentCollector({
            filterUser,
            max: 1, // 1 time click
            time: 1000 * 15 // 15 sec of btn
        })
        collector.on('collect', (i) => {
            i.reply({
                content: 'You click a btn' + i.customId,
                ephemeral: true,
            })
        })
        collector.on('end', async (collection) => {
            collection.forEach((click) => {
                console.log(click.user.id, click.customId)
            })
            await msgInt.editReply({
                content: 'กดไปแล้ว',
                components: [],
            })
        })

    },
}