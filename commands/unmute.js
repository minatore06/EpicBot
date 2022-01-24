module.exports =
{
    name: 'unmute',
    description: "Unmute an user",
    async execute(message, args, client)
    {
        var reason
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

        args.shift()
        reason = args.join(' ')
        
        target.timeout(null, reason)
        .catch(console.error);
    }
}