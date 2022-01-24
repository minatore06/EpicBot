const ms = require('ms')
module.exports =
{
    name: 'mute',
    description: "Mute a user",
    async execute(message, args, client)
    {
        var reason
        var time
        var target

        if(!message.member.permissions.has('MODERATE_MEMBERS'))
        {
            return message.reply("you don't have the permissions to use this command")
        }

        target = message.mentions.members.first() 
        if(!target)
        {
            target = await(await client.guilds.fetch(message.guild.id)).members.fetch(args[1])
            if(!target)
            {
                return message.reply("the tagged user doesn't exist")
            }
        }

        try {   
            time = ms(args[1])
            args.shift()
        } catch (error) {
            time = ms('60s')
        }

        args.shift()
        reason = args.join(' ')
        
        target.timeout(time, reason)
        .catch(console.error);
    }
}