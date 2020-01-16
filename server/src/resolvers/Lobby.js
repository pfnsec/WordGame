const Lobby = {
  creator: ({ id }, args, context) => {
    return context.prisma.lobby({ id }).creator()
  },

  partner: ({ id }, args, context) => {
    return context.prisma.lobby({ id }).partner()
  },
}

module.exports = {
  Lobby,
}