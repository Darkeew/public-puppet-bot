const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "membercount",
  description: "Check the server's member count.",
  permission: "SEND_MESSAGES",
  type: "Utility",
  usage: "`/membercount`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const guild = client.guilds.cache.get("946518364216520774");
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: "Total Members" })
          .setDescription(
            `There are **${guild.memberCount}** members in this server.`
          )
          .setColor("GREEN")
          .setFooter({ text: `Requested by ${interaction.user.tag}` })
          .setTimestamp(),
      ],
    });
  },
};
