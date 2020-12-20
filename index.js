
const Discord = require("discord.js");
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.login(token);




client.on('message' , message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;  //Some error handling


    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    let stopProcess = true

    if (command === 'presence') {
      if (!args.length) {
        countPresence();
    }
      else {
        let className = args[0];
        let presenceTime = 100;
        if (args[1]) {
          presenceTime = parseInt(args[1])*60*1000;
          console.log(presenceTime)
        } 
        countClass(className , presenceTime , stopProcess);
      }
    }
    else if (command === 'phelp') {
      message.channel.send("Please use : !presence [class] [time]")
    }


  function countPresence() {

      const user = message.author;         // Fetch sender's username
      const userVoiceChannel = message.member.voice.channelID;   // Fetch sender's voice channe
      
      if (!userVoiceChannel) {
        return message.channel.send("Cant , no one is here");
      }
      else {          
    
        var present = 0;
        var reactionPresent = [];
        var channelSize =  message.member.voice.channel.members.size; 

        message.channel.send("Please Check " + user.username  +  "'s Presence: ").then(msg => {
    
          msg.react(`👍`);
          const filter = (reaction, user) => {
              reactionPresent.push(user['id']);   // Add whoever voted to array 
              return [`👍`].includes(reaction.emoji.name);
          };
    
          const collector = msg.createReactionCollector(filter, {max: channelSize ,time: 10000});
          collector.on('collect', (reaction) => {
              if (reaction.emoji.name === `👍`) {
                  present +=1
                  channelSize = message.member.voice.channel.members.size;
              }
          });

          collector.on('end', (reaction, reactionCollector) => {
                if (present === (channelSize)){
                    message.channel.send("Everyone is here.");
                }
                else {
                    var userToId = message.member.voice.channel.members.map(member => member.user.toString()); 
                    res = userToId.filter(el => !reactionPresent.includes(el))             
                    message.channel.send("These students: [ " + res + " ] are absent");
                }
          });
    
      })

    }
  }

  function countClass(className , presenceTime , stopProcess) {

    const user = message.author;         // Fetch sender's username
    const userVoiceChannel = message.member.voice.channelID;   // Fetch sender's voice channe
    
    if (!userVoiceChannel) {
      return message.channel.send("Cant , no one is here");
    }
    else {          
  
      var present = 0;
      var reactionPresent = [];
      var channelSize =  message.member.voice.channel.members.size; 

      var classList = message.guild.roles.cache.find(role => role.name == className).members.map(member => member.user.toString());}
  
      message.channel.send("Please Check " + user.username  +  "'s Presence: ").then(msg => {
  
        msg.react(`👍`);
        const filter = (reaction, user) => {
            reactionPresent.push(user['id']);   // Add whoever voted to array 
            return [`👍`].includes(reaction.emoji.name);
        };
  
        const collector = msg.createReactionCollector(filter, {max: Math.max(channelSize , classList.length) ,time: presenceTime});
        collector.on('collect', (reaction) => {
            if (reaction.emoji.name === `👍`) {
                present +=1
                channelSize = message.member.voice.channel.members.size;
            }
        });
        collector.on('end', (reaction, reactionCollector) => {
            var userToId = message.member.voice.channel.members.map(member => member.user.toString()); 
            if (classList.sort() == reactionPresent.sort()) {
              res = userToId.filter(el => !reactionPresent.includes(el))  
              message.channel.send("Everyone is here.");
            }
            else {

              res = classList.filter(el => !reactionPresent.includes(el))   
              res = res.filter(el => !userToId.includes(el))          
              message.channel.send("These students: [ " + res + " ] are absent");
  
            }
        });
  
    })

  }

})



function countClass(className , presenceTime , stopProcess) {

    const user = message.author;         // Fetch sender's username
    const userVoiceChannel = message.member.voice.channelID;   // Fetch sender's voice channe
    
    if (!userVoiceChannel) {
      return message.channel.send("Cant , no one is here");
    }
    else {          
  
      var present = 0;
      var reactionPresent = [];
      var channelSize =  message.member.voice.channel.members.size; 

      var classList = message.guild.roles.cache.find(role => role.name == className).members.map(member => member.user.toString());}
  
      message.channel.send("Please Check " + user.username  +  "'s Presence: ").then(msg => {
  
        msg.react(`👍`);
        const filter = (reaction, user) => {
            reactionPresent.push(user['id']);   // Add whoever voted to array 
            return [`👍`].includes(reaction.emoji.name);
        };
  
        const collector = msg.createReactionCollector(filter, {max: Math.max(channelSize , classList.length) ,time: presenceTime});
        collector.on('collect', (reaction) => {
            if (reaction.emoji.name === `👍`) {
                present +=1
                channelSize = message.member.voice.channel.members.size;
            }
        });
        collector.on('end', (reaction, reactionCollector) => {
            var userToId = message.member.voice.channel.members.map(member => member.user.toString()); 
            if (classList.sort() == userToId.sort() === reactionPresent.sort()) {
              message.channel.send("Everyone is here.");
            }
            else {

              res = classList.filter(el => !reactionPresent.includes(el))             
              message.channel.send("These students: [ " + res + " ] are absent");
  
            }
        });
  
    })

  }
