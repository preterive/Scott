const database = require("../../configuração/database.js");
const Discord = require('discord.js')

exports.run = async (scott, message, args) => {

    database.Users.findOne({ _id: message.author.id }, function (erro, usuario) {

        if (usuario.owner) {

            message.guild.members.forEach(member => {
                if (member.id != scott.user.id && !member.user.bot) {
                    member.addRole('585939109999280138')
                        .catch(error => {
                            console.log(`Error adding tag from: **${member.user.tag}**, stopping the system for 25 seconds!`)
                            scott.channels.get('593961514646634517').send(`<:error:538505640889417752> - Error adding member tag: **${member.user.tag}**`)
                            delay(20000);
                        });
                    console.log(`Tag added to member: ${member.user.tag} successfully.`)
                    scott.channels.get('593961514646634517').send(`<:okay:538503952900161538> - Tag: **test** | added to member **${member.user.tag}** successfully!`)
                }
            })

            message.channel.send(`<:okay:538503952900161538> - ${message.author}, beginning the tag addition process, wait until the! | <:lens:538527577674088468> - Check the channel: <#593971530615226388> to know more process information`)

        } else {

            var yEmbed = new Discord.RichEmbed()

                .setColor("#36393e")
                .setDescription(`<:error:538505640889417752> - ${message.author}, you don´t have **permission** to execute this **command**`)
            message.channel.send(yEmbed)
        }
    })
}

module.exports.config = {
    name: "tag",
    aliases: ["mass", "tag"]
}
