const index = require('../index')

module.exports = {
    name: 'myemojis',
    description: `Voir les emojis que tu as ajouté`,
    default_member_permissions: (1 << 3),
    async run (_client, interaction) {
        const emojis = await index.getEmojis(interaction.user.id);
        const userEmojis = [];
        emojis.forEach(emoji => {
            interaction.guild.emojis.cache.forEach(guildEmoji => {
                if (guildEmoji.name == emoji.name)
                    userEmojis[userEmojis.length] = guildEmoji;
            })
        })
        var reply = 'Tes emojis: \n\n';
        userEmojis.forEach(emoji => reply += emoji.toString() + ' ')
        if (reply.length > 2000) reply = reply.substring(0, 2000);
        interaction.reply({
            content: reply,
            ephemeral: true
        })
    }
}