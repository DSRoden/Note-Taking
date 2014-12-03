'use strict';

var bcrypt     = require('bcrypt'),
    request    = require('request'),
    path       = require('path'),
    AWS        = require('aws-sdk'),
    crypto = require('crypto'),
    pg         = require('../postgres/manager.js');

function User(obj){
    this.username = obj.username;
}

User.register = function(obj, cb){
    var user = new User(obj);
    console.log(obj.password);
    makeUrl(obj.avatar, function(url, file){
        user.avatar = url;
        user.password = bcrypt.hashSync(obj.password, 8);
        pg.query('insert into users (username, password, avatar) values ($1, $2, $3) returning id', [user.username, user.password, user.avatar], function(err, results){

            if(err){
                console.log(err);
                return cb(true);
            }
            download(user.avatar, file, cb)
        });
    })
};


//Private helper function for S3//

function makeUrl(url, cb){

    var ext  = path.extname(url);

    crypto.randomBytes(48, function(ex, buf) {
        var token = buf.toString('hex'),
            file = token + '.avatar' + ext,
            avatar = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + file;

        cb(avatar, file);
    });
}

function download(url, file, cb){
        var s3 = new AWS.S3();
        request({url: url, encoding: null}, function(err, response, body){
            var params = {Bucket: process.env.AWS_BUCKET, Key: file, Body: body, ACL: 'public-read'};
            s3.putObject(params, cb);
        });
}

module.exports = User;




/*




function usernameV(v){
  return v.length >= 3 && v.length <= 12;
}

function passwordV(v){
  return v.length === 60;
}


module.exports = User;
*/
