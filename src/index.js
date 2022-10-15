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

// ============================================================

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
    const ret = await prisma.emojis.delete({
        where: { name }
    })
    return ret;
}




module.exports = { getEmoji, getEmojis, addEmoji, removeEmoji };