const { PermissionsBitField } = require('discord.js');
const index = require('../index')

module.exports = {
    name: 'removeemoji',
    description: `Supprimer un emoji`,
    options: [
        {
            name: 'name',
            description: `Nom de l'emoji`,
            required: true,
            type: 3
        }
    ],
    async run (_client, interaction) {
        const name = interaction.options.getString('name');

        const emoji = await index.getEmoji(name);

        if (!emoji) {
            interaction.reply({
                content: 'Cet emoji n\'existe pas',
                ephemeral: true
            })
            return;
        }
        if (emoji.author != interaction.user.id && !interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.Administrator)) {
            interaction.reply({
                content: 'Tu ne peux pas supprimer un emoji que tu n\'as pas créé',
                ephemeral: true
            })
            return;
        }
        await index.removeEmoji(name);
        interaction.reply({
            content: 'L\'emoji ' + name + ' a bien été supprimé',
            ephemeral: true
        })
    }
}