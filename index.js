const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });
const { Token, port } = require("./Structures/config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

client.commands = new Collection();
client.buttons = new Collection();

["Events", "Commands", "Buttons", "Errors"].forEach((handler) => {
  require(`./Structures/Handlers/${handler}`)(client, PG, Ascii);
});
client.login(Token);
