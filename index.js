//By Ahmed Abd El-Latif Gaming
require("events").EventEmitter.defaultMaxListeners = 200;
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const express = require("express");
const app = express();
app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});



const prefix = "-" // البرفيكس
//STATUS CODE
//By Ahmed Abd El-Latif Gaming
client.on("ready", () => {
console.log(`Logged As ${client.user.tag}`);
client.user.setActivity(`${client.user.username} | ${prefix}طلب `, { type: "PLAYING" }); // حاله البوت
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.username}!`)
}).login(process.env.token)

//SET ODRER ROOM COMMANDS CODE
//By Ahmed Abd El-Latif Gaming
let order11 = JSON.parse(fs.readFileSync("./order1.json", 'utf8'));
client.on('message', async message => {
if(message.author.bot || !message.guild)return;
if(message.content.startsWith(prefix + 'set-room')){

  if(!message.guild.member(client.user).hasPermission('ADMINISTRATOR')) return message.channel.send(`** > I Don't Have Permission**`) 

  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`**> You Don't Have \`ADMINISTRATOR\`**`)
var args1 = message.content.split(" ").slice(1).join(" ");    
let channel = message.mentions.channels.first() 
if(!args1) return message.channel.send(`> **Write Name Channel**`);
if(!channel) return message.channel.send(`> **there is no channel with this name ${args1}**`);
message.channel.send(`> **Done Selected Channel Commands**`);
order11[message.guild.id] = {
channel: channel.id,    
}
fs.writeFile("./order1.json", JSON.stringify(order11), (err) => {
if(err)
console.error(err);
})
}

})


//HELP CODE
//By Ahmed Abd El-Latif Gaming
client.on("message",message=>{
if(message.content.startsWith(`${prefix}help`)){ // امر الهيلب
if(!order11[message.guild.id]) return message.channel.send(`**Please Type : \`${prefix}set-room #channel\` To Select Commands Channel**`)
if(message.channel.id !== order11[message.guild.id].channel) return message.reply(`**اذهب لروم الطلبات <#${order11[message.guild.id].channel}>**`)
if(message.author.bot || !message.guild)return;
let embed = new Discord.MessageEmbed()
.setTitle(`Order Bot`)//By Ahmed Abd El-Latif Gaming
.setAuthor(`${message.author.tag}`,message.author.avatarURL())
.setColor(`RANDOM`)
.setThumbnail(client.user.avatarURL())
.setTimestamp()
.addField(`**● | ${prefix}set-room**`, `**\` لأختيار روم تشغيل الأوامر \`**`)
.addField(`**● | ${prefix}set-order**`, `**\` لأختيار روم ارسال الطلبات \`**`)
.addField(`**● | ${prefix}order - ${prefix}طلب**`,`**\` للطلب \`**`)
.setFooter(`ALaska S`)

message.channel.send(embed)
}
})




//SET ODRER ROOM CODE
//By Ahmed Abd El-Latif Gaming
let order = JSON.parse(fs.readFileSync("./order.json", 'utf8'));
client.on('message', async message => {
if(message.author.bot || !message.guild)return;
if(message.content.startsWith(prefix + 'set-order')){

if(!message.guild.member(client.user).hasPermission('ADMINISTRATOR')){
message.channel.send(`** > I Don't Have Permission \`__ADMINISTRATOR__\`**`)} 
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`**> You Don't Have \`ADMINISTRATOR\`**`)
if(!order11[message.guild.id]) return message.channel.send(`**Please Type : \`${prefix}set-room #channel\` To Select Commands Channel**`)

var args1 = message.content.split(" ").slice(1).join(" ");    
let channel = message.mentions.channels.first() 
if(!args1) return message.channel.send(`> **Write Name Channel**`);
if(!channel) return message.channel.send(`> **there is no channel with this name ${args1}**`);
message.channel.send(`> **Done Selected Channel order**`);
order[message.guild.id] = {
channel: channel.id,    
}
fs.writeFile("./order.json", JSON.stringify(order), (err) => {
if(err)
console.error(err);
})
}

})



// ORDER CODE
//By Ahmed Abd El-Latif Gaming
client.on('message', async message => {
if(message.author.bot || !message.guild) return;
if(message.content.startsWith(prefix + 'order') ||
 message["content"]["startsWith"](prefix + "or") ||
 message.content.startsWith(prefix + 'طلب')){
if(!order11[message.guild.id]) return message.channel.send(`**Please Type : \`${prefix}set-room #channel\` To Select Commands Channel**`)
if(!order[message.guild.id]) return message.channel.send(`**Please Type : \`${prefix}set-order #channel\` To Use This Command**`)
     if(!message.guild.member(client.user).hasPermission('ADMINISTRATOR')) return message.channel.send(`** > I Don't Have Permission \`__ADMINISTRATOR__\`**`) 
   if(message.channel.id !== order11[message.guild.id].channel) return message.reply(`**اذهب لروم الطلبات
   <#${order11[message.guild.id].channel}>**`)
let order1 = message.content.split(" ").slice(1).join(" ");
if(!order1) return message.channel.send(`> **اكتب طلبك**`);
let room = message.guild.channels.cache.find(ro => ro.id === `${order[message.guild.id].channel}`);
if(!room) return message.channel.send(`> **Not Found Room**`);
let send21 = new Discord.MessageEmbed()
.setTitle(` طلب جديد : `)
.setAuthor(`${message.guild.name}`, message.guild.iconURL())
.addField(`طلب جديد من`, message.author)
.setDescription(`> **${order1} **`)
.setTimestamp()
.setThumbnail("https://cdn.discordapp.com/attachments/973318110943785000/1174460243607048253/VID-20231109-WA0000_1.gif?ex=6567ac56&is=65553756&hm=49ecb78b38cc73af1bb532e92d2cab229d7d17bef2adb9a547a9e7696c91253c&")
.setFooter(`\Hollywood S`, client.user.avatarURL())
.setColor('RANDOM')
await room.send(`** طلب جديد للبائعين :**`);
room.send(send21).then(msg =>{
message.delete().then(c =>{
message.reply(`** تم ارسال الطلب الخاص بك للبائعين <#${order[message.guild.id].channel}>**`).then(m=>{
  m.delete({timeout:10000})
})
})
})
fs.writeFile("./order.json", JSON.stringify(order), (err) => {
if(err)
console.error(err);
 });    
  }
});
           const channelId = '1214936963153661972'; // حط ايدي الروم يلي بدك البوت يحذف فيها الرسايل 
           client.on('message', (message) => {
             if (message.channel.id === channelId) {
               message.delete()
                 .catch(error => console.error(`Error deleting message: ${error}`));
             }
           });
  

 






