'use strict';

module.exports = {
  description: 'Get User Status',
  tags:['users'],
  handler: function(request, reply){
    console.log(request.auth.credentials);
    reply(request.auth.credentials);
  }
};
