const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const noblox = require('noblox.js')
const RPunishSchema = require('../../Schemas.js/rpunish')

module.exports = {
    data: new SlashCommandBuilder()
      .setName('roblox')
      .setDescription('Roblox commands.')
      .addSubcommand(command =>
        command
          .setName('search')
          .setDescription('Search up a roblox user.')
          .addStringOption(option => option.setName('username1').setRequired(true).setDescription('roblox username')))
      .addSubcommand(command =>
        command
          .setName('bolo')
          .setDescription('Create a bolo for a roblox user.')
          .addStringOption(option => option.setName('username2').setDescription('roblox username').setRequired(true))
          .addStringOption(option => option.setName('reason1').setDescription('The reason for the bolo.').setRequired(true)))
      .addSubcommand(command =>
        command
          .setName('kick')
          .setDescription('Create a kick for a roblox user.')
          .addStringOption(option => option.setName('username3').setDescription('roblox username').setRequired(true))
          .addStringOption(option => option.setName('reason2').setDescription('The reason for the bolo.').setRequired(true)))
      .addSubcommand(command =>
        command
          .setName('ban')
          .setDescription('Create a ban for a roblox user.')
          .addStringOption(option => option.setName('username4').setDescription('roblox username').setRequired(true))
          .addStringOption(option => option.setName('reason3').setDescription('The reason for the bolo.').setRequired(true)))
      .addSubcommand(command =>
        command
          .setName('warn')
          .setDescription('Create a warn for a roblox user.')
          .addStringOption(option => option.setName('username5').setDescription('roblox username').setRequired(true))
          .addStringOption(option => option.setName('reason4').setDescription('The reason for the bolo.').setRequired(true)))
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute (interaction) {

        const command = interaction.options.getSubcommand();

        const user1 = interaction.options.getString('username1');
        const user2 = interaction.options.getString('username2');
        const user3 = interaction.options.getString('username3');
        const user4 = interaction.options.getString('username4');
        const user5 = interaction.options.getString('username5');

        const reason1 = interaction.options.getString('reason1');
        const reason2 = interaction.options.getString('reason2');
        const reason3 = interaction.options.getString('reason3');
        const reason4 = interaction.options.getString('reason4');

        const data = await RPunishSchema.findOne({
            GuildId: interaction.guild.id
        })

        const channel = interaction.guild.channels.cache.get(`${data.Channel}`);

    switch (command) {

        case 'search':
        await interaction.deferReply();

        const id = await noblox.getIdFromUsername(`${user1}`);
        if (!id) return await interaction.editReply({ content: `No user found with the username \`${user1}\``, ephemeral: true });
        const info = await noblox.getPlayerInfo(id);
        const profilePicture = await noblox.getPlayerThumbnail([id], '720x720', 'png', false, 'body')

        const embed1 = new EmbedBuilder()
        .setTitle('Roblox Search')
        .setColor('#2b2d31')
        .setThumbnail(profilePicture[0].imageUrl)
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
        .addFields(
            { name: `Username`, value: `${info.username}`, inline: true },
            { name: `ID`, value: `${id}`, inline: true },
            { name: `Joined`, value: `<t:${Math.floor(info.joinDate / 1000)}:R>`, inline: true },
        )
        await interaction.editReply({ embeds: [embed1] })
    }

    switch (command) {

        case 'bolo':
        const id2 = await noblox.getIdFromUsername(`${user2}`);
        if (!id2) return await interaction.editReply({ content: `No user found with the username \`${user2}\``, ephemeral: true });
        const info2 = await noblox.getPlayerInfo(id2);
        const profilePicture2 = await noblox.getPlayerThumbnail([id2], '720x720', 'png', false, 'body')

        const boloEmbed = new EmbedBuilder()
          .setTitle('New Bolo')
          .setThumbnail(profilePicture2[0].imageUrl)
          .setColor('#2b2d31')
          .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
          .addFields(
            { name: `Username`, value: `${info2.username}`, inline: true },
            { name: `ID`, value: `${id2}`, inline: true },
            { name: `Reason`, value: `${reason1}`, inline: true },
            { name: `Moderator`, value: `${interaction.user}`, inline: false },
          )

          channel.send({ embeds: [boloEmbed] });
          await interaction.reply({ content: `**${interaction.user.username}**, bolo created.`, ephemeral: true });
    }

    switch (command) {

        case 'kick':
        const id3 = await noblox.getIdFromUsername(`${user3}`);
        if (!id3) return await interaction.editReply({ content: `No user found with the username \`${user3}\``, ephemeral: true });
        const info3 = await noblox.getPlayerInfo(id3);
        const profilePicture = await noblox.getPlayerThumbnail([id3], '720x720', 'png', false, 'body')

        const kickEmbed = new EmbedBuilder()
          .setTitle('New Kick')
          .setThumbnail(profilePicture[0].imageUrl)
          .setColor('#2b2d31')
          .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
          .addFields(
            { name: `Username`, value: `${info3.username}`, inline: true },
            { name: `ID`, value: `${id3}`, inline: true },
            { name: `Reason`, value: `${reason2}`, inline: true },
            { name: `Moderator`, value: `${interaction.user}`, inline: false },
          )

          channel.send({ embeds: [kickEmbed] });
          await interaction.reply({ content: `**${interaction.user.username}**, kick created.`, ephemeral: true });
    }

    switch (command) {

        case 'ban':
        const id4 = await noblox.getIdFromUsername(`${user4}`);
        if (!id4) return await interaction.editReply({ content: `No user found with the username \`${user4}\``, ephemeral: true });
        const info4 = await noblox.getPlayerInfo(id4);
        const profilePicture = await noblox.getPlayerThumbnail([id4], '720x720', 'png', false, 'body')

        const banEmbed = new EmbedBuilder()
          .setTitle('New Ban')
          .setThumbnail(profilePicture[0].imageUrl)
          .setColor('#2b2d31')
          .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
          .addFields(
            { name: `Username`, value: `${info4.username}`, inline: true },
            { name: `ID`, value: `${id4}`, inline: true },
            { name: `Reason`, value: `${reason3}`, inline: true },
            { name: `Moderator`, value: `${interaction.user}`, inline: false },
          )

          channel.send({ embeds: [banEmbed] });
          await interaction.reply({ content: `**${interaction.user.username}**, ban created.`, ephemeral: true });
    }

    switch (command) {

        case 'warn':
        const id5 = await noblox.getIdFromUsername(`${user5}`);
        if (!id5) return await interaction.editReply({ content: `No user found with the username \`${user5}\``, ephemeral: true });
        const info5 = await noblox.getPlayerInfo(id5);
        const profilePicture = await noblox.getPlayerThumbnail([id5], '720x720', 'png', false, 'body')

        const warnEmbed = new EmbedBuilder()
          .setTitle('New Warn')
          .setThumbnail(profilePicture[0].imageUrl)
          .setColor('#2b2d31')
          .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
          .addFields(
            { name: `Username`, value: `${info5.username}`, inline: true },
            { name: `ID`, value: `${id5}`, inline: true },
            { name: `Reason`, value: `${reason4}`, inline: true },
            { name: `Moderator`, value: `${interaction.user}`, inline: false },
          )

          channel.send({ embeds: [warnEmbed] });
          await interaction.reply({ content: `**${interaction.user.username}**, warn created.`, ephemeral: true });
    }

    }
}