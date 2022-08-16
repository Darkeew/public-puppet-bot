const { CommandInteraction, MessageEmbed, GuildEmoji } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Ban an user.",
  permission: "BAN_MEMBERS",
  options: [
    {
      name: `user`,
      description: `The user to ban.`,
      type: `USER`,
      required: true,
    },
    {
      name: `reason`,
      description: `The reason of the ban.`,
      type: `STRING`,
    },
    {
      name: `time`,
      description: `The time for the ban. (ex: 1d, 7h, 9m)`,
      type: `STRING`,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    //Change this

    //const g = `986357448925401168` //Test server
    //const staff = `986600882810544138` //Test server staff role
    //const trainee = `986600882810544138` //Test server trainee role
    const g = `946518364216520774`; //Neco server
    const staff = `970229987405877259`; //Neco server staff role
    const trainee = `946525021545828422`; //Neco server trainee role

    //Change this

    const user = interaction.options.getUser(`user`);
    const reason = interaction.options.getString(`reason`);
    const time = interaction.options.getString(`time`);

    const RestartsModel = require("../../Structures/Schema/Restarts");

    if (user === interaction.user.id) {
      return interaction.reply({
        content: "You cannot ban yourself!",
        ephemeral: true,
      });
    }

    const guild = client.guilds.cache.get(g);

    if (guild.fetchBan(user.id)) console.log("kekw");
    try {
      client.u = guild.members.cache.get(user.id);
    } catch (e) {
      console.log(e);
    }

    const member = client.u;
    const uid = user.id;
    if (!client.mer) {
      if (member) {
        if (member.roles.cache.has(staff)) {
          return interaction.reply({
            content: `You cannot ban someone that is a staff member!`,
            ephemeral: true,
          });
        }

        if (member.roles.cache.has(trainee)) {
          return interaction.reply({
            content: `You cannot ban someone that is a staff member!`,
            ephemeral: true,
          });
        }
      }
    }
    const restart = await RestartsModel.findOne();
    const cases = restart.cases;

    if (time) {
      const num = time.replace(/\D/g, "");
      if ((num = "")) {
        return interaction.reply({
          content: "You need to input a valid time! (ex: 1d, 7h, 5m)",
          ephemeral: true,
        });
      }

      const letter = time.replace(/[^a-zA-Z]+/g, "");
      if (letter === "") {
        return interaction.reply({
          content: "You need to input a valid time! (ex: 1d, 7h, 5m)",
          ephemeral: true,
        });
      } else if (letter.length !== 1) {
        return interaction.reply({
          content: "You need to input a valid time! (ex: 1d, 7h, 5m)",
          ephemeral: true,
        });
      }
      if (letter === "d") {
        if (num === `1`) {
          client.l = "day";
        } else {
          client.l = "days";
        }
        client.ts = Math.floor(60 * 60 * 24 * num + Date.now() / 1000);
      } else if (letter === "m") {
        if (num === `1`) {
          client.l = "minute";
        } else {
          client.l = "minutes";
        }
        client.ts = Math.floor(60 * num + Date.now() / 1000);
      } else if (letter === "h") {
        if (num === `1`) {
          client.l = "hour";
        } else {
          client.l = "hours";
        }
        client.ts = Math.floor(60 * 60 * num + Date.now() / 1000);
      }
    }
    if (!reason) {
      client.reason = `**no reason**`;
    } else {
      client.reason = `reason: \`${reason}\``;
    }
    if (time) client.time = `for \`${num} ${client.l}\``;
    else client.time = "**permanently**";
    guild.members
      .ban(uid)
      .catch((e) => {
        console.log(e);
      })
      .then(() => {
        try {
          member.send({
            embeds: [
              new MessageEmbed().setDescription(
                `You have been banned for: \`${client.reason}\` in \`Puppet's Neco Cult\`. If you wish to appeal your ban, head over to https://forms.gle/CXawHH1m3tjJGDvs6 and fill up the form.`
              ),
            ],
          });
        } catch (e) {
          console.log(e);
        }
      });
    await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({ name: `Case ${cases}` })
          .setColor("DARK_GOLD")
          .setDescription(
            `${user} (${user.id}) has been banned ${client.time} with ${client.reason}.`
          )
          .setFooter({
            text: `Requested by ${interaction.user.tag}`,
          })
          .setTimestamp(),
      ],
    });
    //await CasesModel.create({
    //  punisher: `${interaction.user.id}`,
    //  punished: `${client.id}`,
    //  type: "ban",
    //  reason: reason,
    //  time: client.ts,
    //  expired: false,
    //  case: cases,
    //});
    //restart.cases++;
    //await restart.save();
  },
};
