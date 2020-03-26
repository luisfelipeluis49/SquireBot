const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
    client.user.setPresence({game: {name: 'comando', type: 1, url: 'https://www.twitch.tv/pedroricardo'} });
});

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
  
  if(comando === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latencia da API é ${Math.round(client.ping)}ms`);
  }

  //Ramdomize dice rollings

  if(comando === "roll4") {
    const roll = await message.channel.send("Rolling...");
    const num = Math.floor(Math.random() * (5 - 1)) + 1;
    roll.edit(`The rolling was ${num}`);
  }

  if(comando === "roll6") {
    const roll = await message.channel.send("Rolling...");
    const num = Math.floor(Math.random() * (7 - 1)) + 1;
    roll.edit(`The rolling was ${num}`);
  }

  if(comando === "roll8") {
    const roll = await message.channel.send("Rolling...");
    const num = Math.floor(Math.random() * (9 - 1)) + 1;
    roll.edit(`The rolling was ${num}`);
  }

  if(comando === "roll10") {
    const roll = await message.channel.send("Rolling...");
    const num = Math.floor(Math.random() * (11 - 1)) + 1;
    roll.edit(`The rolling was ${num}`);
  }

  if(comando === "roll12") {
    const roll = await message.channel.send("Rolling...");
    const num = Math.floor(Math.random() * (13 - 1)) + 1;
    roll.edit(`The rolling was ${num}`);
  }

  if(comando === "roll20") {
    const roll = await message.channel.send("Rolling...");
    const num = Math.floor(Math.random() * (21 - 1)) + 1;
    roll.edit(`The rolling was ${num}`);
  }

  if(comando === "roll100") {
    const roll = await message.channel.send("Rolling...");
    const num = Math.floor(Math.random() * (101 - 1)) + 1;
    roll.edit(`The rolling was ${num}`);
  }

  //Ramdomize Coin Loots

  if(comando === "lootcoin") {
    const loot = await message.channel.send("looting...");
    const coin = Math.floor(Math.random() * (101 - 1)) + 1;
    loot.edit(`You have founded ${coin} gold coins`);
  }

  //Ramdomize Loots

  if(comando === "loottiny") {
    for(var i = 0; i < 3; i++){
        var loot = await message.channel.send("looting...");
        var itemGroup = Math.floor(Math.random() * (101 - 1)) + 1;
        var item;
            if (itemGroup < 40) {
                item = " bauble";
            } 
            else if (itemGroup < 60) {
                item = "n under Level";
            } 
            else if (itemGroup < 80) {
                item = " your level";
            } 
            else if (itemGroup < 95) {
                item = "n over Level";
            } 
            else if (itemGroup < 99) {
                item = "n epic";
            }
            else {
                item = " legendary";
            }
        loot.edit(`The player[s] founded a${item} item`);
    }
  }

  if(comando === "lootsmall") {
    for(var i = 0; i < 5; i++){
        var loot = await message.channel.send("looting...");
        var itemGroup = Math.floor(Math.random() * (101 - 1)) + 1;
        var item;
            if (itemGroup < 40) {
                item = " bauble";
            } 
            else if (itemGroup < 60) {
                item = "n under Level";
            } 
            else if (itemGroup < 80) {
                item = " your level";
            } 
            else if (itemGroup < 95) {
                item = "n over Level";
            } 
            else if (itemGroup < 99) {
                item = "n epic";
            }
            else {
                item = " legendary";
            }
        loot.edit(`The player[s] founded a${item} item`);
    }
  }

  if(comando === "lootmedium") {
    for(var i = 0; i < 8; i++){
        var loot = await message.channel.send("looting...");
        var itemGroup = Math.floor(Math.random() * (101 - 1)) + 1;
        var item;
            if (itemGroup < 40) {
                item = " bauble";
            } 
            else if (itemGroup < 60) {
                item = "n under Level";
            } 
            else if (itemGroup < 80) {
                item = " your level";
            } 
            else if (itemGroup < 95) {
                item = "n over Level";
            } 
            else if (itemGroup < 99) {
                item = "n epic";
            }
            else {
                item = " legendary";
            }
        loot.edit(`The player[s] founded a${item} item`);
    }
  }

  if(comando === "lootbig") {
    for(var i = 0; i < 13; i++){
        var loot = await message.channel.send("looting...");
        var itemGroup = Math.floor(Math.random() * (101 - 1)) + 1;
        var item;
            if (itemGroup < 40) {
                item = " bauble";
            } 
            else if (itemGroup < 60) {
                item = "n under Level";
            } 
            else if (itemGroup < 80) {
                item = " your level";
            } 
            else if (itemGroup < 95) {
                item = "n over Level";
            } 
            else if (itemGroup < 99) {
                item = "n epic";
            }
            else {
                item = " legendary";
            }
        loot.edit(`The player[s] founded a${item} item`);
    }
  }

  if(comando === "lootlarge") {
    for(var i = 0; i < 21; i++){
        var loot = await message.channel.send("looting...");
        var itemGroup = Math.floor(Math.random() * (101 - 1)) + 1;
        var item;
            if (itemGroup < 40) {
                item = " bauble";
            } 
            else if (itemGroup < 60) {
                item = "n under Level";
            } 
            else if (itemGroup < 80) {
                item = " your level";
            } 
            else if (itemGroup < 95) {
                item = "n over Level";
            } 
            else if (itemGroup < 99) {
                item = "n epic";
            }
            else {
                item = " legendary";
            }
        loot.edit(`The player[s] founded a${item} item`);
    }
  }

  if(comando === "gracemewithaname"){
    const firstFix = ['Adri','Eb','Del','Mar','Kris','Gun','Per','Ive','Had','Sar','Val','Lesh','Try','Gar','Wel','Jil','Pa','Os','Dum','Hel','Ivo','Ol','Cha','Yu','Ak','Leu','Mor','Ea','Ne','Phe'];
    const secondFix = ['be','erk','gran','da','ga','dred','an','mo','eli','lynn','si','nai','ton','bo','dal','ena','ela','tia','an','chen','ang','la','chro','non','ke','cis','bry','is','eta','ka'];
    const thirdFix = ['seis','ch','mon','sk','nt','ump','ddo','ryn','ock','thi','xius','jir','sfr','treg','hyu'];
    const fourthFix = ['sik','grim','hek','vol','liss','vol','in','id','men','ing','dal','dd','ra','rey','tra'];

    var nameThinker = await message.channel.send("let me think...");
    var howManyFix = Math.floor(Math.random() * (13 - 1)) + 1;
    var name;
    for(var i = 0; i < howManyFix; i++){
        if(i === 0){
            name = firstFix[Math.floor(Math.random() * (31 - 1))]
        } else if(i === 3){
            name = name + secondFix[Math.floor(Math.random() * (31 - 1))]
        } else if(i === 8){
            name = name + thirdFix[Math.floor(Math.random() * (16 - 1))]
        } else if(i === 10){
            name = name + fourthFix[Math.floor(Math.random() * (16 - 1))]
        }
    }
    nameThinker.edit(`I think ${name} would be nice`);
  }

  if(comando === "somequest"){
    const firstQuest = ['Adri','Eb','Del','Mar','Kris','Gun','Per','Ive','Had','Sar','Val','Lesh','Try','Gar','Wel','Jil','Pa','Os','Dum','Hel','Ivo','Ol','Cha','Yu','Ak','Leu','Mor','Ea','Ne','Phe'];
    const secondQuest = ['be','erk','gran','da','ga','dred','an','mo','eli','lynn','si','nai','ton','bo','dal','ena','ela','tia','an','chen','ang','la','chro','non','ke','cis','bry','is','eta','ka'];
    const thirdQuest = ['seis','ch','mon','sk','nt','ump','ddo','ryn','ock','thi','xius','jir','sfr','treg','hyu'];
    const fourthQuest = ['sik','grim','hek','vol','liss','vol','in','id','men','ing','dal','dd','ra','rey','tra'];
    const foundedQuest = Math.floor(Math.random() * (3 - 1)) + 1;

    var questThinker = await message.channel.send("searching for some quest...");
    wait(4000);
    var howManyNeeds = Math.floor(Math.random() * (13 - 1)) + 1;
    var quest;
    if(foundedQuest === 2){
        for(var i = 0; i < howManyNeeds; i++){
            if(i === 0){
                quest = firstQuest[Math.floor(Math.random() * (31 - 1))];
            } else if(i === 3){
                quest = quest + secondQuest[Math.floor(Math.random() * (31 - 1))];
            } else if(i === 8){
                quest = quest + thirdQuest[Math.floor(Math.random() * (16 - 1))];
            } else if(i === 10){
                quest = quest + fourthQuest[Math.floor(Math.random() * (16 - 1))];
            }
        }
        questThinker.edit(`I founded this: ${quest}`);
    } else{
        questThinker.edit(`I didn't founded anything sir, maybe if i look around again...`);
    }
  }
  
});

client.login(config.token);

/*async function lootItems() {
    var loot = await message.channel.send("looting...");
    var itemGroup = Math.floor(Math.random() * (101 - 1)) + 1;
    var item;
        if (itemGroup < 40) {
            item = " bauble";
        } 
        else if (itemGroup < 60) {
            item = "n under Level";
        } 
        else if (itemGroup < 80) {
            item = " your level";
        } 
        else if (itemGroup < 95) {
            item = "n over Level";
        } 
        else if (itemGroup < 99) {
            item = "n epic";
        }
        else {
            item = " legendary";
        }
    loot.edit(`The player[s] founded a${item} item`);
}*/

function wait(ms)
{
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
}
