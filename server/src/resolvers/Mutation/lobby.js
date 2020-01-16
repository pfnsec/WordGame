const { getUserId } = require('../../utils')

const lobby = {
  async createLobby(parent, {}, context) {
    const userId = getUserId(context)
    return context.prisma.createLobby({
      title,
      content,
      author: { connect: { id: userId } },
    })
  },

  async submitTurn(parent, { word, l_id }, context) {
    const userId = getUserId(context)

    lobby = context.prisma.lobby(
      {
        where: { l_id },
      }

    )

    if(userId == lobby.creator && lobby.creator_word == "") {
      return context.prisma.updateLobby(
        {
          where: { l_id },
          data: { creator_word: word },
        },
      )

    } else if(userId == lobby.partner && lobby.partner_word == "") {
      return context.prisma.updateLobby(
        {
          where: { l_id },
          data: { partner_word: word },
        },
      )

    } else {
      throw new Error(`Post not found or you're not the author`)
    }

/*
    return context.prisma.updateLobby(
      {
        where: { l_id },
        data: { published: true },
      },
    )
    */
  },

  /*
  async deletePost(parent, { id }, context) {
    const userId = getUserId(context)
    const postExists = await context.prisma.$exists.post({
      id,
      author: { id: userId },
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return context.prisma.deletePost({ id })
  },
  */
}

module.exports = { lobby }
