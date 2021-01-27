const Discord = require("Discord.js");
const botConfig = require("./botconfig.json");
const fs = require("fs");

const activeSongs = new Map();

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./commands/" , (err, files) => {

    if(err) console.log(err);

    let jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <=0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {
        let fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet);
    }) 
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is opgestart.`)

    bot.user.setActivity("music",{
        type:"STREAMING",
        url:"https://www.twitch.tv/jeffreyyt"
    })
});

bot.on("message", async message => {

    // Wanneer de bot een bericht stuurt stuur dan return.
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    let prefix = botConfig.prefix;

    let messageArray = message.content.split(" ");

    let command = messageArray[0];

    let arguments = messageArray.slice(1);

    let commands = bot.commands.get(command.slice(prefix.length));

    let options = {
        active: activeSongs


    };
    
    if(commands) commands.run(bot,message, arguments, options);
    
    if (command === `${prefix}help`) {

        let botEmbed = new Discord.MessageEmbed()
            .setTitle("✅**help**✅")
            .setDescription("**De commands zijn als volgt!:** **!help=Geeft alle commands| !info: Laat info zien over de bot| !play=Speelt muziek af| !leave=Laat de bot uit het kanaal gaan|**")
            .setColor("#0000FF")
            .setThumbnail("https://i.scdn.co/image/ab67706c0000bebb12d1a711a79106326fa56b85")  
            .setFooter("© created by JeffreyYT✅#2340", "https://i.scdn.co/image/ab67706c0000bebb12d1a711a79106326fa56b85")
            .setTimestamp();

        return message.channel.send(botEmbed); 
    };
    
    if (command === `${prefix}info`) {
        let botEmbed = new Discord.MessageEmbed()
            .setTitle("✅Info✅")
            .setDescription("**Bedankt dat je mij hebt toegevoegd op jou server!! doe ook even !help voor de commands, veel plezier!**")
            .setColor("#0000FF")
            .setThumbnail("https://i.scdn.co/image/ab67706c0000bebb12d1a711a79106326fa56b85")
            .setFooter("© created by JeffreyYT✅#2340", "https://i.scdn.co/image/ab67706c0000bebb12d1a711a79106326fa56b85")
            .setTimestamp();

        return message.channel.send(botEmbed); 
    }
    
    if (command === `${prefix}invite`) {
        let botEmbed = new Discord.MessageEmbed()
            .setTitle("✅**Invite**✅")
            .setDescription("** Hier is een link om de bot te inviten https://Discord.com/api/oauth2/authorize?client_id=759780057287491646&permissions=0&scope=bot**")
            .setColor("#0000FF")
            .setThumbnail("https://i.scdn.co/image/ab67706c0000bebb12d1a711a79106326fa56b85")  
            .setFooter("© created by JeffreyYT✅#2340", "https://i.scdn.co/image/ab67706c0000bebb12d1a711a79106326fa56b85")
            .setTimestamp();

        return message.channel.send(botEmbed); 
    };
});

bot.login(config.token);
