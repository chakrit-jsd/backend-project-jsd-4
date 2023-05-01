 const plzLogin = (req, res, next) => {
  if (!req.user) return next({resError: [401, 'Please Login']})
  next()
}

const plzLogout = (req, res, next) => {
  if (req.user) return next({resError: [400, 'please Logout']})
  next()
}


module.exports = {
  plzLogin,
  plzLogout
}
