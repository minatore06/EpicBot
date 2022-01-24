module.exports =
{
    name: 'unmute',
    description: "Unmute an user",
    async execute(message, args, client)
    {
        let reason
        let target

        if(!message.member.permissions.has('MODERATE_MEMBERS'))
        {
            return message.reply("You don't have the permissions to use this command")
        }

        target = message.mentions.members.first() || message.guild.members.fetch(args[0])
        
        if (!target)
        {
            return message.reply("The tagged user doesn't exist")
        }

        if(!message.mentions.members.first().isCommunicationDisabled())
        {
            return message.reply("The tagged user is not muted")
        }

        if(!target.moderatable)
        {
            return message.reply("This bot hasn't the perm needed to mute")
        } 

        args.shift()
        reason = args.join(' ')
        
        if (!reason) 
        {
            reason = "No reason"
        }

        target.timeout(null, reason)
        .catch(console.error);

        return message.reply("User unmuted")
    }
}