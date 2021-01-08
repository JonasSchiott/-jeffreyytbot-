const { MessageEmbed } = require('discord.js');
const { version } = require('../package.json');
const moment = require("moment");
require("moment-duration-format");
module.exports.run = async (bot, message, args) => {
 let totalSeconds = bot.uptime / 1000;
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
      .addField(':bar_chart: | **Server Count**', `${bot.guilds.cache.size.toLocaleString()}` , true)
      .addField(':chart_with_upwards_trend: | **User Count**', `${bot.users.cache.size.toLocaleString()}`, true)
      .addField(':card_box: | **Channel Count**', `${bot.channels.cache.size.toLocaleString()}`, true)
      .addField(':chart_with_downwards_trend: | **Memory Usage**', `${ram} MB`, true)
      .addField(':page_facing_up: | **Version**', `v${version}`, true)
      .setFooter('${message.user.username}')
    await message.channel.send({ embed });
    
}

module.exports.help = {
    name: "stats",
}
