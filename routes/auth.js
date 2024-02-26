const jwt = require('express-jwt');
const secret = require('../config').secret;

function getTokenFromHeader(req){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

let auth = {
  required: function(req, res, next) {
    req.payload = {
      id: '618e24c1bda095d2b3b0defb'
    };
    next();
  },
  optional: function(req, res, next) {
    next();
  }
};

if (process.env.NODE_ENV === 'production') {
  auth = {
    required: jwt({
      secret: secret,
      userProperty: 'payload',
      algorithms: ['RS256'],
      getToken: getTokenFromHeader
    }),
    optional: jwt({
      secret: secret,
      userProperty: 'payload',
      algorithms: ['RS256'],
      credentialsRequired: false,
      getToken: getTokenFromHeader
    })
  };
}

module.exports = auth;
