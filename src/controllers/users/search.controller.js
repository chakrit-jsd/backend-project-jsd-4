const Users = require('../../models/Users.schema')


const getUsersBySearch = async (req, res, next) => {
const textSearch = req.query.text
const limitSearch = 5
  try {
    const users = await Users.find(
      { profilename: { $regex: `${textSearch}`, $options: 'i' } },
      'profilename firstname lastname smallImgUrl')
      .nor({ _id: req.user._id })
      .limit(limitSearch)

    const userId = users?.map((user) => user._id)
    userId?.push(req.user._id)

    if (users.length < limitSearch) {
      const remain = limitSearch - users.length
      const usersSec = await Users.find(
        { firstname: { $regex: `${textSearch}`, $options: 'i' } },
        'profilename firstname lastname smallImgUrl')
        .nor({ _id: userId })
        .limit(remain)

      users.push(...usersSec)
    }

    if (users.length === 0) return res.status(200).json({ message: 'Not found'})

    res.status(200).json({ users: users })

  } catch (error) {
    next(error)
  }

}

module.exports = {
  getUsersBySearch
}
