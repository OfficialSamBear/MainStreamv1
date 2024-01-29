const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits } = require('discord.js')
const SessionSchema = require('../../Schemas.js/setupsessions')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('session')
    .setDescription('Start command using.')
    .addSubcommand(command =>
      command
        .setName('startup')
        .setDescription('Session startup.'))
    .addSubcommand(command =>
      command
        .setName('shutdown')
        .setDescription('Session shutdown.'))
    .addSubcommand(command =>
      command
        .setName('vote')
        .setDescription('Session vote.'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {

      const command = interaction.options.getSubcommand();

      const data = await SessionSchema.findOne({
        GuildId: interaction.guild.id
      })

      const channel = interaction.guild.channels.cache.get(`${data.Channel}`)

      const embed1 = new EmbedBuilder()
        .setTitle('Session Startup')
        .setDescription(`A staff member has decided to start a session, get ready and join up.\n\n**Server Name:** ${data.Name}\n**Server Owner:** ${data.Owner}\n**Server Code:** [Click Me](${data.Code})`)
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
        .setThumbnail(interaction.guild.iconURL())
        .setColor('#2b2d31');

      const embed2 = new EmbedBuilder()
        .setTitle('Session Shutdown')
        .setDescription(`A staff member has decided to shutdown the server, we hope that you enjoyed the lasting session inside of **${data.Name}**, and we hope you come back to enjoy another one. Make sure to enjoy the rest of your day.`)
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
        .setThumbnail(interaction.guild.iconURL())
        .setColor('#2b2d31');

      const embed3 = new EmbedBuilder()
        .setTitle('Session Vote')
        .setDescription(`A staff member has decided to host a session, please vote up in order for a session to start.\n\n**${data.Votes}**+ votes are required to host.`)
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
        .setThumbnail(interaction.guild.iconURL())
        .setColor('#2b2d31');

    switch (command) {

        case 'startup':
        channel.send({ embeds: [embed1] });
        await interaction.reply({ content: 'Session Started!', ephemeral: true });
    }

    switch (command) {

        case 'shutdown':
        channel.send({ embeds: [embed2] });
        await interaction.reply({ content: 'Session Shutdown!', ephemeral: true });
    }

    switch (command) {

        case 'vote':
        channel.send({ embeds: [embed3] });
        await interaction.reply({ content: 'Session Vote Started!', ephemeral: true });
    }

    }
}