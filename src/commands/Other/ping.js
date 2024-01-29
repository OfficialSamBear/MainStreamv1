const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Get the latency of the bot.'),

  async execute(interaction) {

    const ping = Date.now() - interaction.createdTimestamp;
    const user = interaction.user.username;

    await interaction.reply({ content: `**${user}**, my latency is \`${ping}ms\`!` });
  }
}