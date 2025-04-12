const Discord = require('discord.js-selfbot-v13');

// TOKEN YAPISTIR
const token = "";

const client = new Discord.Client({
    checkUpdate: false, 
});

client.on('ready', () => {
    console.log(`${client.user.tag} olarak giriş yapıldı.`);
});

client.on('messageCreate', async (message) => {
    
    if (message.author.id !== client.user.id) return;

    
    if (message.content.startsWith('!sil')) {
        const args = message.content.split(' ');
        const limit = parseInt(args[1], 10) || 10; 

        const messages = await message.channel.messages.fetch({ limit: 100 });
        const userMessages = messages.filter(msg => msg.author.id === client.user.id).first(limit);

        for (const msg of userMessages) {
            await msg.delete().catch(console.error);
        }

        console.log(`Son ${limit} mesaj silindi.`);
    }
});


client.login(token);
