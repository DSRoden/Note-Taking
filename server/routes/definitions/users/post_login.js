'use strict';

var Joi  = require('joi'),
  User = require('../../../models/user');

module.exports = {
  description: 'Login a User',
  tags:['users'],
  validate: {
    payload: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  auth: {
    mode: 'try'
  },
  handler: function(request, reply){
    User.login(request.payload, function(user){
      if(user){
        console.log('user is back', user);
        delete user.password;
        request.auth.session.set(user);
        reply(user);
      }else {
        reply().code(401);
      }
    });
  }
};
