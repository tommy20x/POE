const v = require('express-validator');
const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const auth = require('../auth');
const helper = require('../helper');
const userSvc = require('../../services/user.service');


/**
 * Create a new user account.
 */
router.post('/',
  auth.required, 
  v.body('username').isString(),
  v.body('email').isString(),
  v.body('password').isString(),
  helper.validate,
  helper.createRouter(async function({ body }) {
    return await userSvc.createAccount(body.username, body.email, body.password);
  })
);

/**
 * Get user information.
 */
router.get('/',
  auth.required,
  helper.createRouter(async function({ payload }) {
    return await userSvc.getUserInfo(payload.id);
  })
);

/**
* Change user password.
*/
router.put('/password',
  auth.required, 
  v.body('currentPassword').isString(),
  v.body('password').isString(),
  helper.validate,
  helper.createRouter(async function({ payload, body }) {
    return await userSvc.changePassword(payload.id, body.currentPassword, body.password);
  })
);

/**
* Change user email.
*/
router.put('/email',
  auth.required, 
  v.body('email').isString(),
  helper.validate,
  helper.createRouter(async function({ payload, body }) {
    return await userSvc.changeUserEmail(payload.id, body.email);
  })
);

/**
* Change user name.
*/
router.put('/username',
  auth.required, 
  v.body('username').isString(),
  helper.validate,
  helper.createRouter(async function({ payload, body }) {
    return await userSvc.changeUserName(payload.id, body.username);
  })
);

/*router.post('/users/login', function(req, res, next){
  if(!req.body.user.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});*/

module.exports = router;
