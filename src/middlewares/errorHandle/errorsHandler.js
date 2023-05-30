module.exports = (err, req, res, next) => {
  console.log(err)
  const [ status, message ] = err.resError
  if(!status) {
    // console.log(err)
    return res.status(500).json({message: 'Somthing Went Wrong Please Try Again'})
  }
  res.status(status).json({message: message})
  // console.log('sssssssss', status)
  next()
}
