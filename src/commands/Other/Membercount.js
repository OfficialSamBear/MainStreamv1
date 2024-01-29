const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('membercount')
    .setDescription('Get the member count of the server.'),

  async execute(interaction) {

    const guild = interaction.guild;
    const user = interaction.user.username;
    const memberCount = guild.memberCount;

    await interaction.reply({ content: `**${user}**, there are \`${memberCount}\` members in this server!` });
    }
  }