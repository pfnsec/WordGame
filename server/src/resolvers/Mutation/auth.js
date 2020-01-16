const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = {
  async setNick(parent, args, context) {
    //const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.createUser({ ...args })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
}

module.exports = { auth }
