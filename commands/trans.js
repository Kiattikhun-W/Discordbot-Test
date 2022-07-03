const axios = require('axios').default;



module.exports = {
    category: 'test', // Required for the slash commands
    description: 'กรุณาพิมพ์คำทับศัพท์', // Required for the slash commands

    slash: true, // If options are given then slash must be either true or 'both'
    testOnly: true, // Ensure you have test servers setup

    options: [
        {
            name: 'word', // Must be lower case
            description: 'คำทับศัพท์.',
            required: true,
            type: 'STRING',
        },

    ],
    callback: async ({ interaction, args }) => {
        const word1 = String(args[0])

        const dataWord = {
            item: 20,
            languageId: 0,
            word: word1,
        }
        let config = {
            method: "post",
            url: "https://transliteration.orst.go.th:9090/api/v1/search",
            headers: {
                "Connection": "keep-alive",
                "Accept": "application/json;charset=UTF-8",
                'Accept-Encoding': 'gzip, deflate, br',
                "Accept-Language": " en-US,en;q=0.9,th;q=0.8",
                "Connection": "keep-alive",
                "Content-Length": "43",
                "Content-Type": "application/json;charset=UTF-8",
                "Host": "transliteration.orst.go.th:9090",
                "Origin": "https://transliteration.orst.go.th",
                "Referer": "https://transliteration.orst.go.th/",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": " cors",
                "Sec-Fetch-Site": " same-site",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                "token": "token_inet_dev",
            },
            data: dataWord
        };
        axios(config)
            .then((response) => {
                if (response.data[0].alphabet.split(',').includes(word1)) {
                    interaction.reply({
                        content: String(response.data[0].alphabet),
                    })
                } else {
                    throw Error('ไม่พบคำ')
                }
            })
            .catch((error) => {
                interaction.reply({
                    content: String(error),
                })
            });

    },
}