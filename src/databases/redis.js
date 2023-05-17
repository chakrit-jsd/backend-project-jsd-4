const { createClient } = require('redis')
const client = createClient({ url: process.env.REDIS_SERVER })

client.connect().catch(console.error)

const RedisStore = require('connect-redis').default

module.exports = new RedisStore({ client })
