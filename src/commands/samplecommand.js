module.exports = {
    name: 'samplecommand',
    description: `Sample command`,
    default_member_permissions: (1 << 3),
    options: [
        {
            name: 'string',
            description: `This is a string argument`,
            required: true,
            type: 3
        },
        {
            name: 'int',
            description: `This is an int argument`,
            required: true,
            type: 4
        },
        {
            name: 'mention',
            description: `This is an @mention argument`,
            required: true,
            type: 6
        }
    ],
    run: (_client, interaction) => {
        const { options } = interaction;
        const string = options.getString('string');
        const int = options.getInteger('int');
        const mention = options.getUser('mention')
        interaction.reply({
            content: 'Hello ' + mention.toString() + ' ! ' + string + ' ' + int, 
            ephemeral: true
        })  
    }
}