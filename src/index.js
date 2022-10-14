const { Client, Collection } = require('discord.js')
const client = new Client({ intents: 513 });

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


