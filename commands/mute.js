const ms = require('ms')
module.exports =
{
    name: 'mute',
    description: "Mute an user",
    async execute(message, args, client)
    {
        let reason
        let time
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

        if (target.permissions.has('MODERATE_MEMBERS')) 
        {
            return message.reply("Can't mute that user, he also can mute")
        }

        if(!target.moderatable)
        {
            return message.reply("This bot hasn't the perm needed to mute")
        } 

        if(message.mentions.members.first().isCommunicationDisabled())
        {
            return message.reply("The tagged user is already muted")
        }

        try {   
            time = ms(args[1])
            args.shift()
        } catch (error) {
            time = ms('60s')
        }

        args.shift()
        reason = args.join(' ')
        
        if (!reason) 
        {
            reason = "No reason"
        }

        target.timeout(time, reason)
        .catch(console.error);

        return message.reply("User muted for " + time + "ms")
    }
}