module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        //console.log(message);
        if (!message.author.bot) {
          // message.reply({content: 'test', ephemeral: true})
        }
    }
}