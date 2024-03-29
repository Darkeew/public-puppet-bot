const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "search",
  description: "Search for coins like a weirdo.",
  permission: "SEND_MESSAGES",
  type: "Economy",
  usage: "`/search`",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const SettingsModel = require("../../../Structures/Schema/Settings.js");
    const CommandModel = require(`../../../Structures/Schema/Command_Checker`);
    const cmdchecker = await CommandModel.findOne({
      user: interaction.user.id,
    });
    if (!cmdchecker) {
      await CommandModel.create({ user: interaction.user.id });
    }
    const usercmds = await CommandModel.findOne({ user: interaction.user.id });
    const is_blacklisted = await SettingsModel.findOne({
      channel: interaction.channel.id,
    });
    if (is_blacklisted !== null) {
      if (!is_blacklisted.commands.includes(`search`)) {
        return interaction.reply({
          embeds: [
            new MessageEmbed().setDescription(
              `This command has been disabled in this channel.`
            ),
          ],
          ephemeral: true,
        });
      }
    } else if (!is_blacklisted) {
      return interaction.reply({
        embeds: [
          new MessageEmbed().setDescription(
            `This command has been disabled in this channel.`
          ),
        ],
        ephemeral: true,
      });
    }
    const EconomyChecker = require("../../../Structures/Schema/Economy_Checker");
    const user_exists = await EconomyChecker.findOne({
      user: interaction.user.id,
    });

    if (!user_exists) {
      await EconomyChecker.create({ user: interaction.user.id, balance: 0 });
    }

    const command = await EconomyChecker.findOne({ user: interaction.user.id });
    const coins = Math.floor(Math.random() * 150);
    if (Math.floor(Date.now() / 1000) <= command.search_cooldown) {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `Cooldown` })
            .setDescription(
              `You are currently on cooldown! You can only ask for money again at <t:${command.search_cooldown}:T>.`
            )
            .setColor(`#ff3067`),
        ],
        ephemeral: true,
      });
    }
    if (coins < 30) {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({ name: `No coins found` })
            .setDescription(
              "What did you expect? You tried searching behind a police station's dumpster. You were luck you were not arrested."
            )
            .setColor(`#ff3067`)
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
      const cooldown = Math.floor(Date.now() / 1000 + 30);
      await EconomyChecker.findOneAndUpdate(
        { user: interaction.user.id },
        { search_cooldown: cooldown }
      );
    } else {
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(
              `You dig up an old time capsule someone buried in their front yard a few years ago, you find ${coins} inside, neato!`
            )
            .setColor(`#ff3067`)
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp(),
        ],
      });
      const new_balance = Math.floor(command.balance + coins);
      const cooldown = Math.floor(Date.now() / 1000 + 30);
      await EconomyChecker.findOneAndUpdate(
        { user: interaction.user.id },
        { balance: new_balance, search_cooldown: cooldown }
      );
    }
  },
};
