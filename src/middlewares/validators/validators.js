var isBase64 = require('is-base64')

const validateFileBase64 = (file) => {
  return isBase64(file, {allowMime: true})
}


const validateBody = (schema) => async (req, res, next) => {
  try {
    let file = ''
    if (req.body.file) {
      // console.log('file')
      // const result = validateFileBase64(req.body.file)
      // console.log(result)
      // if (!result) throw { message: 'Invalid Image' }
      file = req.body.file
      req.body.file = ''
    }
    await schema.validateAsync(req.body)
    req.body.file = file
    next()

  } catch (error) {
    next({ resError:  [ 422, error.message ] })
  }
}


const validateParams = (schema) => async (req, res, next) => {
  const params = req.params.userId || req.params.cardId
  try {
    await schema.validateAsync({ id: params })

    next()

  } catch (error) {
    next({resError: [ 404, 'Not Found' ]})
  }
}

module.exports = {
  validateBody,
  validateParams
}
