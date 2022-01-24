module.exports =
{
    name: 'ban',
    description: "Ban an user",
    execute(message, args, client)
    {
        let banReason
        let target

        if(!message.member.permissions.has('BAN_MEMBERS'))
        {
            return message.reply("You don't have the permissions to use this command")
        }

        target = message.mentions.members.first() || message.guild.members.fetch(args[0])
        
        if (!target)
        {
            return message.reply("The tagged user doesn't exist")
        }

        if (target.permissions.has('BAN_MEMBERS')) 
        {
            return message.reply("Can't ban that user, he also can ban")
        }

        if(!target.bannable)
        {
            return message.reply("This bot hasn't the perm needed to ban")
        } 

        args.shift()
        banReason = args.join(" ");
        
        if (!banReason) 
        {
            banReason = "No reason"
        }

        target.ban({days: 1,reason: banReason})
        .catch(console.error);

        return message.reply("User banned")
    }
}