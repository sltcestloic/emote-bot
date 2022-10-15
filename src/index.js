const { Client, Collection } = require('discord.js')
const client = new Client({ intents: 513 });
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

client.commands = new Collection();

['CommandHandler', 'EventHandler'].forEach(handler => { require(`./handlers/${handler}`)(client) })

// ===================== DevMode / Login =====================
var isDevMode = false;

const argv = process.argv.slice(2);
if (argv.length > 0 && argv[0] == '--dev')
isDevMode = true;

console.log("Development mode is " + (isDevMode ? "enabled" : "disabled"));

const { token } = isDevMode ? require('../config/bot-config.dev.json') : require('../config/bot-config.json')

client.login(token)

var emojis = [];

async function getEmojis(author) {
    const ret = await prisma.emojis.findMany({
        where: { author }
    })
    return ret;
}

async function getEmoji(name) {
    const ret = await prisma.emojis.findUnique({
        where: { name }
    })
    return ret;
}

async function addEmoji(author, name) {
    const ret = await prisma.emojis.create({
        data: {
            author,
            name
        }
    })
    return ret;
}

async function removeEmoji(name) {

}


// ============================================================

async function updateEmojis(guild) {
    const emojiCache = guild.emojis.cache;
    for (var i = 0; i < emojiCache.size; i++) 
    emojiCache.at(i).author = await emojiCache.at(i).fetchAuthor();
    emojis = [];
    emojiCache.forEach(emoji => emojis[emojis.length] = emoji);
    console.log(emojis);
}

module.exports = { getEmoji, getEmojis, addEmoji, removeEmoji };