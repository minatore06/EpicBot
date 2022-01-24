module.exports =
{
    name: 'mute',
    description: "Mute a user",
    async execute(message, args, client)
    {
        var reason
        var time
        var target

        if(!message.member.permission.has('MODERATE_MEMBERS'))
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

        if(!ms(args[1]))
        {
            time = '60m'
            args.shift()
            reason = args.join(' ')
        }
        else 
        {
            time = args[1]
            args.shift()
            args.shift()
            reason = args.join(' ')
        }
        
        target.timeout(ms(time), reason)
        .catch(console.error);
    }
}