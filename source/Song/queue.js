const lista = require('../../configuração/queue.js')
const Discord = require("discord.js");

exports.run =  async (xerphos, message, args) => {

console.log(`Comando queue ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

try {

var serverQueue = lista.queue.get(message.guild.id)

if(!serverQueue) {
    message.channel.send({
        embed: {
            description: `<:error:538505640889417752>  - ${message.author}, there is nothing **playing**`,
            color: 0x36393e,
        
                }
            }).then(msg => {
        msg.delete(5000)
        })

} else if(serverQueue.radio) {
    
    var num = 0
    var pagina = 1
    var totalPages = parseInt(serverQueue.soms.length/10+1)

    var queuee = new Discord.RichEmbed()

    .setColor(0x36393e)
        .addField(`<:playl:538536887502110730> ▸ Playlist - **${serverQueue.duraTotal}**`, `${serverQueue.soms.map(song => `**[\`${song.numero}\`] -** ${song.title}`).slice(0,10).join('\n')}\n\n`)
            .setFooter(`<:openb:538537329216847872> ▸ Page ${pagina} in ${totalPages}`, message.author.displayAvatarURL)
                .setTimestamp()
                    //.setThumbnail(message.guild.iconURL)

message.channel.send(queuee)

} else {

var TotalDuracao = serverQueue.duraTotal;

let tempo = Math.floor(TotalDuracao)
        let horas;
        let minutos;
        let minutos2;
        let segundos;

        if(tempo >= 3600) {

            horas = Math.floor(tempo / 60 / 60)
            minutos = Math.floor(tempo / 60)
            minutos2 = Math.floor(tempo / 60 - horas * 60)
            segundos = Math.floor(tempo - (minutos * 60))

        } else {

            horas = 0
            minutos = Math.floor(tempo / 60)
            minutos2 = Math.floor(tempo / 60)
            segundos = Math.floor(tempo - (minutos * 60))
        }

var dT = `${(horas < 10 ? '0' + horas : horas) + ':' + (minutos2 < 10 ? '0' + minutos2 : minutos2) + ':' + (segundos < 10 ? '0' + segundos : segundos)}`
var num = 0
var pagina = 1
var totalPages = parseInt(serverQueue.soms.length/10+1)

var queuee = new Discord.RichEmbed()

    .setColor(0x36393e)
        .addField(`<:playl:538536887502110730> ▸ Playlist - **[\`${dT}\`]**`, `${serverQueue.soms.map(song => `**[\`${song.numero}\`] -** ${song.title}`).slice(0,10).join('\n')}\n\n`)
            .setFooter(`<:openb:538537329216847872> ▸ Page ${pagina} in ${totalPages}`, message.author.displayAvatarURL)
                .setTimestamp()
                    //.setThumbnail(message.guild.iconURL)

message.channel.send(queuee).then(async filaMSG => {

if(serverQueue.soms.length > 10) {

await filaMSG.react("537058196708261898");
await filaMSG.react("537057081606406176");

const voltar = filaMSG.createReactionCollector((r, u) => r.emoji.name === "537058196708261898" && u.id === message.author.id, { time: 100000 });
const proximo = filaMSG.createReactionCollector((r, u) => r.emoji.name === "537057081606406176" && u.id === message.author.id, { time: 100000 });

        voltar.on("collect", async r => {

            if(pagina !== 1) {

                num = num-10
                num = num.toString().length > 1 ? num-parseInt(num.toString().slice(num.toString().length-1)) : 0
                pagina -= 1
                queuee.fields[0].value = `${serverQueue.soms.map(song => `**[\`${song.numero}\`] -** ${song.title}`).slice(pagina*10-10,pagina*10).join('\n')}\n\n`
                queuee.setFooter(`<:openb:538537329216847872> ▸ Page ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
                filaMSG.edit(queuee);
                r.remove(r.users.last().id)
            
            } else {

                pagina = totalPages
                num = totalPages*10-20
                queuee.fields[0].value = `${serverQueue.soms.map(song => `**[\`${song.numero}\`] -** ${song.title}`).slice(totalPages*10-10,pagina*10).join('\n')}\n\n`
                queuee.setFooter(`<:openb:538537329216847872> ▸ Page ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
                filaMSG.edit(queuee);
                r.remove(r.users.last().id)
            }
        })

        proximo.on("collect", async r => {

            if(pagina !== totalPages) {

                num = num.toString().length > 1 ? num-parseInt(num.toString().slice(num.toString().length-1)) : 0
                num = num+10
                pagina += 1
                queuee.fields[0].value = `${serverQueue.soms.map(song => `**[\`${song.numero}\`] -** ${song.title}`).slice(pagina*10-10,pagina*10).join('\n')}\n\n`
                queuee.setFooter(`<:openb:538537329216847872> ▸ Page ${pagina} in ${totalPages}`, message.author.displayAvatarURL)
                filaMSG.edit(queuee);
                r.remove(r.users.last().id)

            } else {

                pagina = 1
                num = 0
                queuee.fields[0].value = `${serverQueue.soms.map(song => `**[\`${song.numero}\`] -** ${song.title}`).slice(0,pagina*10).join('\n')}\n\n`
                queuee.setFooter(`<:openb:538537329216847872> ▸ Page ${pagina} in ${totalPages}`, message.author.displayAvatarURL)
                filaMSG.edit(queuee);
                r.remove(r.users.last().id)
            }
        })

        voltar.on("end", async r => {
            
            if(r.size >= 1) return;
    }) 

    filaMSG.delete(100000)
    message.delete(100000)

            }
        })
    }

} catch (e) {

    console.log(`Erro comando de Queue - guild: id:(${message.guild.id}) - nome:(${message.guild.name}) Erro: ${e}`)
    }
}

exports.help = {
    name: "queue",
    aliases: ["queue"],
    diretorio: "Song"
  }