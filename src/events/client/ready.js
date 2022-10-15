const { updateEmojis } = require('../../index')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Bot connected successfuly');
        client.guilds.cache.forEach(guild => {
            guild.commands.set(client.commands.map(command => command))
        })
    }
}