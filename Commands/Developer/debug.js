const { CommandInteraction, MessageEmbed } = require("discord.js");
const { Token } = require("../../Structures/config.json");
const exec = require("child_process").exec;

module.exports = {
  name: "debug",
  description: "Do some debug stuff.",
  permission: "ADMINISTRATOR",
  type: "Forbidden",
  usage: "`Forbidden`",
  options: [
    {
      name: "option",
      description: "Option to debug.",
      type: "STRING",
      required: true,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const string = interaction.options.getString("option");
    if (string === "restart") {
      interaction.reply({ content: "Restarting...", ephemeral: true });
      exec("pm2 restart index.js", { encoding: "utf-8" });
    }
    if (interaction.user.id !== "452436342841016341") {
      return interaction.reply({
        content: "You cannot run this command.",
        ephemeral: true,
      });
    }
      if (string === "stop") {
      interaction.reply({ content: "Stopping...", ephemeral: true });
      exec("pm2 stop index.js", { encoding: "utf-8" });
    } else if (string === "pull") {
      interaction.reply({ content: "Pulling new content...", ephemeral: true });
      exec("git pull origin main", { encoding: "utf-8" });
    }
  },
};
