export {}
import DiscordJS, { Intents, Options, TextChannel } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('FlyHaven Moderation bot has started succesfully.')

const guildId = '938960026326933584'

const guild = client.guilds.cache.get(guildId)
let commands
const appealchannel = client.channels.cache.get('938960027983675414') as any
const reportchannel = client.channels.cache.get('939017615425286224') as any
if(!appealchannel){
    return
}

if(guild){
    commands = guild.commands
} else {
    commands = client.application?.commands
}


    commands?.create({
        name: 'report',
        description: 'Report a member inside of FlyHaven',
        options: [
            {
                name: 'username',
                description: 'The person you are reporting',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
            },
            {
                name: 'why',
                description: 'Why are you reporting this user?',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            },
            {
                name: 'proof',
                description: 'Proof for report (Image link)',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    })


    commands?.create({
        name: 'appeal',
        description: 'Appeal a ban inside of FlyHaven',
        options: [
            {
                name: 'username',
                description: 'Discord Username',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
            },
            {
                name: 'from',
                description: 'Where were you banned from? (Discord/In-Game)',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            },
            {
                name: 'reason',
                description: 'Reason you were banned from FlyHaven.',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            },
            {
                name: 'why',
                description: 'Why should you be unbanned from FlyHaven?',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            },
            {
                name: 'roblox-username',
                description: 'Roblox Username (OPTIONAL ONLY USE IF BANNED FROM ROBLOX)',
                required: false,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
        
  
    })
    

})


client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()){
        return
    }

    const { commandName, options } = interaction
    
    if(commandName === 'appeal'){
        const username = options.getUser('username')
        const from = options.getString('from')
        const reason = options.getString('reason')
        const why = options.getString('why')
        const rblxusername = options.getString('roblox-username')
        interaction.reply({
            content: 'Successfully sent your appeal to FlyHaven Moderators. Trolling in a appeal will lead to termination from all FlyHaven Discord servers.',
            ephemeral: true
        })

const modteam = interaction.guild?.roles.cache.get('939000662740598864')

const appealembed = new DiscordJS.MessageEmbed()
.setColor('DARK_BLUE')
.setTitle(`❗New Ban Appeal from user ${interaction.user.tag}❗`)
.setDescription(`${username}s ban appeal info listed below.`)
.addFields(
    { name: 'Banned from (Discord/In-game)', value: `${from}`},
    { name: 'Reason banned', value: `${reason}`},
    { name: 'Why they want to be unbanned', value: `${why}`},
    { name: 'Roblox Username (if provided)', value: `${rblxusername}`},
)
.setTimestamp()
.setImage('https://cdn.discordapp.com/attachments/921841570481836063/938958677040320582/Screen_Shot_2022-02-03_at_8.29.04_AM.png')




        const appealchannel = client.channels.cache.get('938942859783061575') as any
if(!appealchannel){
    return
}
appealchannel.send({
    content: `${modteam}`,
    embeds:  [appealembed]
})



    } else if(commandName === 'report'){
        const username2 = options.getUser('username')
        const why2 = options.getString('why')
        const proof = options.getString('proof')
        interaction.reply({
            content: 'Successfully sent your report to FlyHaven Moderators. Trolling in a report will lead to termination from all FlyHaven Discord servers.',
            ephemeral: true
        })


        const reportembed = new DiscordJS.MessageEmbed()
        .setColor('DARK_BLUE')
        .setTitle(`❗New User Report from user ${interaction.user.tag}❗`)
        .setDescription(`${username2}s Report info listed below.`)
        .addFields(
            { name: 'User reported', value: `${username2}`},
            { name: 'Why they reported this user', value: `${why2}`},
            { name: 'Proof for report', value: `${proof}`}
        )
        


        const reportchannel = client.channels.cache.get('939017615425286224') as any
if(!reportchannel){
    return
}
const modteam = interaction.guild?.roles.cache.get('939000662740598864')

        reportchannel.send({
            content: `${modteam}`,
            embeds: [reportembed]
        })
        
    }
})


client.login(process.env.TOKEN)