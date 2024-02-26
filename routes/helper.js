const validator = require('express-validator')


const getErrorMessage = function(err) {
  console.log('***********************', err.name, err.code, err.message, "*************************")
  if (err.name === 'ReferenceError') {
    return {
      code: 400011,
      message: err.name,
      errors: err.message
    }
  }
  else if (err.name === 'MongoServerError') {
    if (err.code === 11000) { //duplicated
      return {
        code: err.code,
        message: err.name,
        errors: Object.keys(err.keyValue).reduce(function(errors, key) {
          errors[key] = 'is duplicated';
          return errors;
        }, {})
      }
    }
  }
  else if (err.name === 'ValidationError') {
    return {
      code: 400015,
      message: err.name,
      errors: Object.keys(err.errors).reduce(function(errors, key) {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    }
  }

  return err
}

module.exports = {
  validate: function(req, res, next) {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: {
          code: 400022,
          message: "RequestValidationError",
          errors: errors.array().reduce(function(errors, it) {
            errors[it.param] = it.msg;
            return errors;
          }, {})
        },
      })
    }
    next()
  },

  createRouter: function(callback) {
    return async function(req, res) {
      try {
        return res.json({
          success: true,
          data: await callback(req)
        })
      } 
      catch (e) {
        console.error(e)
        return res.status(422).json({
          errors: getErrorMessage(e),
        })
      }
    }
  }
}