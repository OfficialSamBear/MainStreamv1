const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const mongoURI= process.env.mongoURI;

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        console.log('');

        updatePresence(client);

        setInterval(() => {
            updatePresence(client);
        }, 3000);

        if (!mongoURI) return;

        await mongoose.connect(mongoURI);

        if (mongoose.connection.readyState === 1) {
            console.log('Connected to the database.');
        } else {
            console.log('Failed to connect to the database.');
        }

    },
};

function updatePresence(client) {
    const userCount = client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0);
    const guildCount = client.guilds.cache.size;
    client.user.setPresence({
        activities: [{ name: `/ping | ${userCount} Users`, type: ActivityType.Custom }],
    });
}