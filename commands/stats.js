const { MessageEmbed } = require('discord.js');
const { purple_medium } = require("../../../colours.json");
const { version } = require('../../../package.json');
const moment = require("moment");
require("moment-duration-format");
module.exports = class ApingCommand extends BaseCommand {
  constructor() {
    super('stats', 'mod', [], 'stats');
  }

  async run(client, message) {
 //const duration = moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
 let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
    let cpu = Math.round(process.cpuUsage().system / 1024 / 1024).toString()
    if(cpu < 1) {
        cpu = (process.cpuUsage().system / 1024 / 1024).toFixed()
    }
    let ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
  let uptime = ` ${days.toFixed()} days\n ${hours.toFixed()} hours\n ${minutes.toFixed()} min\n ${seconds.toFixed()} sec `;
    const embed = new MessageEmbed()
      .setTitle("__**Dark Bot Stats**__")
      .setColor('RANDOM')
      .addField(':clock4: | **Uptime**', `${uptime}`, true)
      .addField(':bar_chart: | **Server Count**', `${client.guilds.cache.size.toLocaleString()}` , true)
      .addField(':chart_with_upwards_trend: | **User Count**', `${client.users.cache.size.toLocaleString()}`, true)
      .addField(':card_box: | **Channel Count**', `${client.channels.cache.size.toLocaleString()}`, true)
      .addField(':chart_with_downwards_trend: | **Memory Usage**', `${ram} MB`, true)
      .addField(':page_facing_up: | **Version**', `v${version}`, true)
      .setFooter('${message.user.username}')
    await message.channel.send({ embed });
    
  }

}

    





module.exports.help = {
    name: "stats",
}
