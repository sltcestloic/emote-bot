const index = require('../index')

module.exports = {
    name: 'addemoji',
    description: `Ajouter un emoji`,
    options: [
        {
            name: 'name',
            description: `Nom de l'emoji`,
            required: true,
            type: 3
        },
        {
            name: 'url',
            description: `URL de l'image`,
            required: true,
            type: 3
        },
    ],
    default_member_permissions: (1 << 3),
    async run (_client, interaction) {
        const name = interaction.options.getString('name');
        const url = interaction.options.getString('url');
        if ((!url.startsWith('http://') && !url.startsWith('https://'))) {
            interaction.reply({
                content: 'URL invalide',
                ephemeral: true
            })
            return;
        }
        const userEmojis = await index.getEmojis(interaction.user.id);
        if (userEmojis.length > 4) {
            interaction.reply({
                content: 'Chaque personne à le droit à 5 emojis maximum. Tu peux supprimer un de tes emojis avec la commande `/removeemoji`',
                ephemeral: true
            })
            return;
        }
        const emoji = await index.getEmoji(name);
        if (emoji) {
            interaction.reply({
                content: 'Un emoji avec ce nom existe déjà',
                ephemeral: true
            })
            return;
        }
        index.addEmoji(interaction.user.id, name);
        const addedEmoji = await interaction.guild.emojis.create({ attachment: url, name }).catch(error => {
            console.log(error);
            interaction.reply({content: 'Emoji invalide', ephemeral: true})
            return;
        })
        if (addedEmoji) {
            interaction.reply({
                content: 'L\'emoji ' + addedEmoji.toString() + ' a bien été ajouté',
                ephemeral: true
            })
        }
    }
}