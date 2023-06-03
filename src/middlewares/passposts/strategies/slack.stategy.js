const SlackStrategy = require('passport-slack').Strategy
const Users = require('../../../models/Users.schema')

const { SLACK_CLIENT_ID, SCACK_CLIENT_SECRET, SLACK_CALLBACK } = process.env

const slackStrategy = new SlackStrategy({
  clientID: SLACK_CLIENT_ID,
  clientSecret: SCACK_CLIENT_SECRET,
  callbackURL: SLACK_CALLBACK,
  skipUserProfile: false,
  scope: ['identity.basic', 'identity.email', 'identity.avatar']
},
  async (accessToken, scopes, profiles, next) => {
    try {
      console.log('au 1')
      console.log(accessToken)
      console.log(scopes)
      console.log(profiles)
      const res = await profiles
      console.log(res)
      next(null, profiles)

    } catch (error) {
      next(error)
    }
  }
)

module.exports = slackStrategy
