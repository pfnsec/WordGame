const { Query } = require('./Query')
const { auth } = require('./Mutation/auth')
const { lobby } = require('./Mutation/lobby')
const { Subscription } = require('./Subscription')
const { User } = require('./User')
const { Lobby } = require('./Lobby')
const { Post } = require('./Post')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...lobby,
  },
  Subscription,
  User,
  Lobby,
}
