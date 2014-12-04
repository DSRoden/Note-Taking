'use strict';

var    Note = require('../../../models/note');

module.exports = {
    description: 'Get all Notes',
    tags:['notes'],
    handler: function(request, reply){
        console.log(request.auth.credentials.id);
        Note.getAll(request.auth.credentials.id, function(err, notes){
            if(notes){console.log('this is the note coming back from db', notes.rows);}
            reply(notes.rows).code(err ? 400 : 200);
        });
    }
};
