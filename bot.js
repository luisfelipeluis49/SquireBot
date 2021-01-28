//Discord.js
const Discord = require("discord.js");
const client = new Discord.Client();
//Configs
const config = require("./config.json");
//Database
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('characterSheets.json')
const db = low(adapter)

//Initialize
client.on("ready", () => {
    console.log(` Olá Mundo (de novo)\n Hoje o céu está tão cinza e melancólico...\n Perfeito para acender um cigarro e tomar um café a beira da piscina.`);
    client.user.setPresence({game: {name: 'comando', type: 1, url: 'https://www.twitch.tv/pedroricardo'} });
});
client.login(config.token);

//Comands
client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;
    if(!message.guild) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
  
  //Connection test
  if(comando === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms.`);
  }

  if(comando === "databook") {
    db.set(message.guild.id, []).write()
    message.channel.send('The Librarian started the confection, when you need to request or change an information on databook, you\'ll just need to ask.')
  }

  //Tabletop Audio
  if(comando === "playt") {
    if(!args[0]) return message.reply('put a tabletop link after the play.');
    let [playableLink] = args;
    let tabletopVerify = playableLink.split('.');
    if (tabletopVerify[0] != 'http://tabletopaudio') return message.reply('We only accept links from [https://tabletopaudio.com]'); 
    if (!message.member.voice.channel) return message.reply('You need to join a voice channel first!');
    const connection = await message.member.voice.channel.join();

    const dispatcher = connection.play(playableLink);
    const m = await message.channel.send(`Playing [${playableLink}]`);
    dispatcher.on('finish', () => {
        m.edit(`The stream has finished`);
      });
  }

  if(comando === "play") { 
    if (!message.member.voice.channel) return message.reply('You need to join a voice channel first!');
    const connection = await message.member.voice.channel.join();

    const dispatcher = connection.play('./assets/music/biodome.mp3');
    const m = await message.channel.send(`Playing [biodome]`);
  }

  //Sheets
  if(comando === "sheet") {
    if(!args[0]) {
        return message.channel.send(
            `If you don't wanna help me, then I would not help you.`, 
            { 
                files: [
                    `./assets/archive/editableSheet.pdf`
                ] 
            });
    }
    let [characther] = args;
    db.get(message.guild.id)
    .push({
      id: message.author.id,
      name: characther,
      class: 'barbarian',
      level: 1,
      race: 'stout halfling',
      background: 'hero',
      aligment: 'cn',
      xp: 0, //Experience Point
      strength: [20, 5, 7],
      dexterity: [15, 2, 2],
      constitution: [20, 5, 7],
      intelligence: [6, -2, -2],
      wisdom: [7, -2, -2],
      charisma: [15, 2, 2],
      hp: 17, //Hit Point
      armour: 17,
      hd: '1d12', //Hit Dice
      initiative: 2,
      speed: 25,
      proeficience: 2,
    }).write()
    message.channel.send('Your sheet is filled with a Barbarian Halfling by default. You can edit the basics here so the DM can easylly see it, but I recomends you to use the editable sheet to a full experience.')

  }

  //DM Shields
  /*
   * if(comando === "combate") {
   *   const m = await message.channel.send(`Eu estar aprendendo português ainda. Desculpa.`, { files: ['./assets/image/combat_ptBR.png'] }); 
   * }
   *
   * if(comando === "explorar") {
   *   const m = await message.channel.send(`Eu estar aprendendo português ainda. Desculpa.`, { files: ['./assets/image/exploration_ptBR.png'] }); 
   * }
   *
   * if(comando === "social") {
   *   const m = await message.channel.send(`Eu estar aprendendo português ainda. Desculpa.`, { files: ['./assets/image/social_ptBR.png'] }); 
   * }
   */

  if(comando === "shield") {
    if(!args[0]) {
        return message.channel.send(
        `I founded!`, 
        { 
            files: [
                `./assets/image/dmShield1.png`, 
                `./assets/image/dmShield2.png`, 
                `./assets/image/dmShield3.png`
            ] 
        });
    }
    let [shieldNum] = args;
    if(shieldNum != 1 && shieldNum != 2 && shieldNum != 3) {
        return message.channel.send(`I am sorry master, but I think should try type [1, 2 or 3], instead of ${shieldNum}`);
    }
    
    await message.channel.send("I would gladly be your shield if needed sir, but I think this would not help you right now.\nLet me search for a Dungeon Master Shield in my bag...");
    await message.channel.send(`I founded!`, { files: [`./assets/image/dmShield${shieldNum}.png`] });
  }

  //Ramdomize dice rollings
  if(comando === "roll") {
    if(!args[0]) return message.channel.send('I am sorry master, but roll what?');
    let [temp] = args;
    let dice = temp.split('d');
    if( (Number.isNaN(dice[0] * 1)) && (Number.isNaN(dice[1] * 1)) ) return message.channel.send('I am sorry master, but this kind of dice even exist?');

    const roll = await message.channel.send("Rolling...");
    var rollNum = 0;
    for (let diceNum = 0; diceNum < dice[0]; diceNum++) {
        rollNum = rollNum + Math.floor(Math.random() * (dice[1])) + 1;
    }
    const num = rollNum;
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
    const questBank = ['Adri','Eb','Del','Mar','Kris','Gun','Per','Ive','Had','Sar','Val','Lesh','Try','Gar','Wel','Jil','Pa','Os','Dum','Hel','Ivo','Ol','Cha','Yu','Ak','Leu','Mor','Ea','Ne','Phe'];
    const foundedQuest = Math.floor(Math.random() * (2)) + 1;

    let questThinker = await message.channel.send("searching for some quest...");
    wait(4000);
    let whatQuest = Math.floor(Math.random() * (100)) + 1;
    let quest;
    if(foundedQuest === 2) {
        quest = questBank[whatQuest];
        questThinker.edit(`I founded this: ${quest}`);
    }
    else {
        questThinker.edit(`I didn't founded anything sir, maybe if i look around again...`);
    }
  }
  
});

//Usefull Function
function wait(ms) {
    var d = new Date();
    var d2 = null;
    do {
        d2 = new Date();
    } while (d2-d < ms);
}