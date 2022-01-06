
require('dotenv').config()


const fetch = require('node-fetch')


const { Client, Intents } = require('discord.js')
const client = new Client(
    {
        intents:
            [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_MESSAGE_TYPING]
    });

// string arrays 
    const Keywords = [
        'anxious',
        'sad',
        'depressed',
        'scared',
        'frightened', 
        'i feel bad', 
        'i feel down',
        ]

        const encouragements = [
        'Cheer up buddy!', 
        'You got this bro!',
        'You are the best!',
        'You will make it bro.' ,
        'I believe in you.'
        
        ]

// logging the bot to discord 

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


function getQuote()
{
return fetch('https://zenquotes.io/api/random')

.then(res =>{
return res.json()
})

.then(data =>{

    return data[0].q + ' ~' + data[0].a;
})

.catch(console.log('Error has ocurred!'))

}
// bot message function  

client.on("message", msg => {
    
    if (msg.author.bot) return


    // bot sending a quote if somebody types milkies in the chat 
    if (msg.content === "!quote") {

        getQuote().then(quote => msg.channel.send(quote));
    }

     if (msg.content === 'patryk ssie fiuta'){

        msg.channel.send('Indeed he sucks mine.')
     }
/*if somebody types a word from keywords array, 
 bot responds with word from array encouragements */ 


    if (Keywords.some(word => msg.content.includes(word))){
        
// bot replying with random encouragements from database  
    
const encouragementWord = encouragements[Math.floor(Math.random() *  encouragements.length)];
   
    msg.reply(encouragementWord)
 
}
})


client.login(process.env.BOT_TOKEN)