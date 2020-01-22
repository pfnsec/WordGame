const { getUserId } = require('../../utils')

const lobby = {
  async createLobby(parent, {}, context) {

    const userId = getUserId(context)

    console.log("createLobby")
    console.log(context.prisma.user({id: userId}))

    var user = context.prisma.user({id: userId})

    return context.prisma.createLobby({
      state:   "WAITING",
      creator: user, 
      partner: null,
      creator_word: "",
      partner_word: "",
      rounds: {},
    })
  },

  async joinLobby(parent, {l_id}, context) {

    const userId = getUserId(context)

    console.log("createLobby")
    console.log(context.prisma.user({id: userId}))

    var user = context.prisma.user({id: userId})
    var lobby = context.prisma.lobby({id:  l_id})

    if(lobby.creator != null && lobby.partner != null) { 
      throw new Error(`This lobby is full!`)
    }

    if(user.inLobby != null) { 
      throw new Error(`You're already in a lobby!`)
    }
  },

  async submitTurn(parent, { word, l_id }, context) {
    const userId = getUserId(context)

    lobby = context.prisma.lobby(
      {
        id: { l_id },
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
