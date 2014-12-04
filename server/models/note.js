'use strict';

var pg = require('../postgres/manager.js');

function Note(obj){
    this.title = obj.title;
    this.body  = obj.body;
    this.userId = obj.userId;
}

Note.create = function(obj, cb){
    console.log('obj from note model', obj.userId);
    var note = new Note(obj);
    console.log('note in model', note);
        pg.query('insert into notes (title, body, user_id) values ($1, $2, $3) returning title, body', [note.title, note.body, note.userId], cb);
};

Note.getAll = function(id, cb){
  console.log('id from not model getAll method', id);
    pg.query('select u.username, n.title, n.body from users u inner join notes n on u.id = $1', [id], cb);
};


module.exports = Note;



