const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, Constants } = require('discord.js');

const dotenv = require('dotenv')
const WOKCommands = require('wokcommands')
const path = require('path')

dotenv.config()
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});
client.on('ready', () => {
    new WOKCommands(client, {
        // The name of the local folder for your command files
        commandsDir: path.join(__dirname, 'commands'),
        // What guilds your slash commands will be created in
        testServers: ['991960380005941328']
    })
})
client.login(process.env.TOKEN);

// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);
//     const guildId = '991960380005941328'
//     const guild = client.guilds.cache.get(guildId)
//     let commands = null
//     if (guild) {
//         commands = guild.commands
//     } else {
//         commands = client.application?.commands
//     }
//     commands?.create({
//         name: 'ping',
//         description: 'reply with pong',
//     })
//     commands?.create({
//         name: 'add',
//         description: 'add two num',
//         options: [
//             {
//                 name: 'num1',
//                 description: 'the 1st num',
//                 required: true,
//                 type: Constants.ApplicationCommandOptionTypes.NUMBER
//             },
//             {
//                 name: 'num2',
//                 description: 'the 2nd num',
//                 required: true,
//                 type: Constants.ApplicationCommandOptionTypes.NUMBER
//             }
//         ]
//     })
// });


// client.on('interactionCreate', async interaction => {
//     if (!interaction.isCommand()) return;

//     if (interaction.commandName === 'ping') {
//         await interaction.reply({
//             content: 'pong',
//             ephemeral: true,
//         });
//     }
//     else if (interaction.commandName === 'add') {
//         const num1 = interaction.options.getNumber('num1') || 0
//         console.log(num1)
//         const num2 = interaction.options.getNumber('num2') || 0

//         await interaction.reply({
//             content: `the sum of ${num1 + num2}`,
//             ephemeral: true,
//         });
//     }
// });

// client.login(process.env.TOKEN);





// setInterval(() => {
//     axios('https://www.artisan-jp.com/get_syouhin.php', {
//         method: 'post',
//         data: "kuni=on&sir=120&size=4&color=5",
//         headers: {
//             "Connection": "keep-alive",
//             "Accept": "text/plain,*/*; q=0.01",
//             "X-Requested-With": "XMLHttpRequest",
//             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/93.0.4577.58 Safari/537.36",
//             "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//             "Sec-GPC": "1",
//             "Origin": "https://www.artisan-jp.com",
//             "Sec-Fetch-Site": "same-origin",
//             "Sec-Fetch-Mode": "cors",
//             "Sec-Fetch-Dest": "empty",
//             "Referer": "https://www.artisan-jp.com/fx-hien-eng.html",
//             "Accept-Language": "en-US,en;q=0.9",
//             "Cookie": "lung=jpf"
//         },

//     }).then(result => console.log(result.data)).catch(err => console.log('err', err))
// }, 1000)