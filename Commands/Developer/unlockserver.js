const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "unlockserver",
  description: "Unlock the server.",
  permission: "ADMINISTRATOR",
  type: "Moderation",
  usage: "`/unlockserver`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const guild = client.guilds.cache.get(interaction.guild.id);
    const channels = guild.channels.cache;
    interaction.reply("Unlocking the server... This may take a while");
    const categories = [
      "963181651570085989",
      "946518364216520775",
      "946523255995506738",
      "968621674008281130",
      "986243611484127302",
      "963502912116490290",
      "984940251883651112",
    ];
    lockableChannels = 0;
    channels.forEach((c) => {
      if (c.type === "GUILD_VOICE") return;
      if (c.type === "GUILD_CATEGORY") return;
      if (c.type === "GUILD_PUBLIC_THREAD") return;
      if (c.type === "GUILD_PRIVATE_THREAD") return;
      if (!c.parentId) return;
      if (categories.includes(c.parentId)) return;
      lockableChannels++;
    });
    totalChannelsLocked = 0;
    channelCounter = 0;
    channels.forEach(async (c) => {
      setTimeout(() => {
        try {
          if (c.type === "GUILD_VOICE") return;
          if (c.type === "GUILD_CATEGORY") return;
          if (c.type === "GUILD_PUBLIC_THREAD") return;
          if (c.type === "GUILD_PRIVATE_THREAD") return;
          if (!c.parentId) return;
          if (categories.includes(c.parentId)) return;
          totalChannelsLocked++;
          c.permissionOverwrites.edit("946524059724820500", {
            SEND_MESSAGES: true,
          });
          c.send({
            embeds: [
              new MessageEmbed()
                .setAuthor({ name: "Channel Unlocked" })
                .setDescription(
                  `Nya! <#${c.id}> has been unlocked! Happy chattering!`
                )
                .setColor("DARK_RED")
                .setTimestamp(),
            ],
          });
          if (totalChannelsLocked === lockableChannels) {
            interaction.channel.send("Server has been unlocked.");
            return;
          }
        } catch (e) {
          console.log(e.toString());
        }
      }, channelCounter * 250);
      channelCounter++;
    });
    const logs = guild.channels.cache.get("1009968902941442119");
    logs.send({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: "Server Unlocked" })
          .setDescription(`${interaction.user} has unlocked the server.`)
          .setColor("DARK_GOLD")
          .setTimestamp(),
      ],
    });
  },
};
