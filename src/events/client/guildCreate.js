module.exports = {
    name: 'guildCreate',
    on: true,
    execute(client, guild) {
        console.log('guild create: ' + guild.name);
        
        guild.commands.set(client.commands.map(command => command))
    }
}