module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            command.run(client, interaction);
        }
    }
}