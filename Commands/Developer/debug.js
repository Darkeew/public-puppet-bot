const { CommandInteraction, MessageEmbed } = require("discord.js");
const { Token } = require("../../Structures/config.json");
const exec = require("child_process").exec;

module.exports = {
  name: "debug",
  description: "Do some debug stuff.",
  permission: "SEND_MESSAGES",
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
    if (interaction.user.id !== "452436342841016341") {
      return;
    }
    const string = interaction.options.getString("option");
    if (string === "restart") {
      interaction.reply({ content: "Restarting...", ephemeral: true });
      exec("pm2 restart index", { encoding: "utf-8" });
    }
    if (string === "stop") {
      interaction.reply({ content: "Stopping...", ephemeral: true });
      exec("pm2 stop index", { encoding: "utf-8" });
    }
    if (string === "pull") {
      interaction.reply({ content: "Pulling new content...", ephemeral: true });
      exec("git pull origin main", { encoding: "utf-8" });
    }
    if (string === "pm2 update") {
      interaction.reply({ content: "Updating pm2...", ephemeral: true });
      exec("pm2 update", { encoding: "utf-8" });
    }
  },
};
