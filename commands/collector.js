const { Message, MessageReaction, User } = require("discord.js")


module.exports = {
  category: "Testing",
  description: "Testing",
  slash: 'both',
  testOnly: true,
  callback: async ({ message: Msg, channel, interaction }) => {

    if (Msg) {
      Msg.reply("Please confirm this action");
      Msg.react("👍");

      // const filter = (m: Message) => {
      //   return m.author.id === message.author.id
      // }
      // const collector = channel.createMessageCollector({
      //   filter,
      //   max: 1,
      //   time: 1000 * 5,
      // })
      const filter = (reaction, user) => {
        return user.id === Msg.author.id;
      };

      const collector = Msg.createReactionCollector({
        filter,
        max: 1,
        time: 1000 * 5,
      });
      collector.on("collect", (reaction) => {
        console.log(reaction.emoji);
      });

      collector.on("end", (collected) => {
        if (collected.size === 0) {
          Msg.reply("You did not react in time.");
          return;
        }

        let text = "Collected:\n\n";

        collected.forEach((message) => {
          text += `${message.emoji.name}\n`;
        });

        Msg.reply(text);
      });
    } else {
      const message = await interaction.reply({ content: 'You can react with Unicode emojis!', fetchReply: true });
      try {
        await message.react('🍎');
        await message.react('🍊');
        await message.react('🍇');
      } catch (error) {
        console.error('One of the emojis failed to react:', error);
      }
      const filter = (reaction, user) => {
        return user.id === interaction.user.id;
      };

      message.awaitReactions({ filter, max: 1, time: 6000, errors: ['time'] })
        .then(collected => {

          let text = "Collected:\n\n";

          collected.forEach((message) => {
            text += `${message.emoji.name}\n`;
          });
          // const reaction = collected.first();

          // if (reaction.emoji.name === '👍') {
          //   message.reply('You reacted with a thumbs up.');
          // } else {
          //   message.reply('You reacted with a thumbs down.');
          // }


          message.reply(text);
        })
        .catch(collected => {
          message.reply('You did not react in time.');
        });

    }







  },
} 
