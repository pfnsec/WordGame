const Subscription = {
  nextRound: {
    subscribe: async (parent, args, context) => {
      return context.prisma.$subscribe
        .lobby({
          mutation_in: ['CREATED', 'UPDATED'],
        })
        .node()
    },
    resolve: payload => {
      return payload
    },
  },
}

module.exports = { Subscription }
