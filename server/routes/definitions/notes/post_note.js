'use strict';

var Joi  = require('joi'),
    Note = require('../../../models/note');

module.exports = {
    description: 'Create a Note ',
    tags:['notes'],
    validate: {
        payload: {
            title: Joi.string().required(),
            body: Joi.string().required(),
            userId: Joi.number().required()
        }
    },
    auth: false,
    handler: function(request, reply){
        console.log(request.payload);
        Note.create(request.payload, function(err, note){
            if(note){console.log('this is the note coming back from db', note.rows[0]);}
            reply(note.rows[0]).code(err ? 400 : 200);
        });
    }
};
