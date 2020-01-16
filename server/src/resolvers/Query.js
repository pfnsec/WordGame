const { getUserId } = require('../utils')

const Query = {
  lobbies(parent, args, context) {
    return context.prisma.lobbies({ where: { started: false } })
  },
  me(parent, args, context) {
    const id = getUserId(context)
    return context.prisma.user({ id })
  },
}

module.exports = { Query }
