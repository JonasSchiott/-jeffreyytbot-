const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

   message.channel.send    
   var botEmbed = new discord.MessageEmbed()
            .setTitle("✅**help**✅")
            .setDescription(":ping_pong: Pong! " + (message.createdTimestamp - Date.now()) + "ms")
            .setColor("#0000FF")
            .setThumbnail("https://i.scdn.co/image/ab67706c0000bebb12d1a711a79106326fa56b85")  
            .setFooter("© created by JeffreyYT✅#2340", "https://i.scdn.co/image/ab67706c0000bebb12d1a711a79106326fa56b85")
            .setTimestamp();
   
}



            
            
            

        return message.channel.send(botEmbed); 


module.exports.help = {
   name: "ping",
   description: "Kijk hoe snel je internet is."
}
