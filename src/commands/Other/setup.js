const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const RPunishSchema = require('../../Schemas.js/rpunish')
const SessionSchema = require('../../Schemas.js/setupsessions')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Setup the Settings.')
    .addSubcommand(command =>
      command
        .setName('roblox-moderation')
        .setDescription('Setup roblox moderation.')
        .addChannelOption(option => option.setName('channel1').setDescription('The logging channel for punishments.').setRequired(true)))
    .addSubcommand(command =>
      command
        .setName('sessions')
        .setDescription('Setup session commands.')
        .addChannelOption(option => option.setName('channel').setDescription('The logging channel for sessions to be sent in.').setRequired(true))
        .addStringOption(option => option.setName('server-name').setDescription('Roblox server name.').setRequired(true))
        .addStringOption(option => option.setName('server-code').setDescription('Game join link.').setRequired(true))
        .addStringOption(option => option.setName('server-owner').setDescription('server owner roblox username.').setRequired(true))
        .addIntegerOption(option => option.setName('votes-amount').setDescription('Required votes to ssu.').setRequired(true)))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageServer),

  async execute(interaction) {

      const command = interaction.options.getSubcommand();

      const channel1 = interaction.options.getChannel('channel1');
      const channel3 = interaction.options.getChannel('channel');
      const channel4 = interaction.options.getChannel('channel4');

      const whoMention = interaction.options.getRole('mention');
      
      const serverName = interaction.options.getString('server-name');
      const serverCode = interaction.options.getString('server-code');
      const serverOwner = interaction.options.getString('server-owner');
      const serverVotes = interaction.options.getInteger('votes-amount');

    switch (command) {

        case 'roblox-moderation':
        await interaction.reply({ content: `**${interaction.user.username}**, punish channel has been set.` });
        await RPunishSchema.insertMany({
            Guild: interaction.guild.name,
            GuildId: interaction.guild.id,
            Channel: channel1.id
        })
    }

    switch (command) {

        case 'sessions':
        await interaction.reply({ content: `**${interaction.user.username}**, session data has been set.` });
        await SessionSchema.insertMany({
            Guild: interaction.guild.name,
            GuildId: interaction.guild.id,
            Channel: channel3.id,
            Name: serverName,
            Code: serverCode,
            Owner: serverOwner,
            Votes: serverVotes
        })
    }

  }

}