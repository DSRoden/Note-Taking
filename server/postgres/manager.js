'use strict';
var pg = require('pg');

exports.query = function(sql, params, cb){

    pg.connect(process.env.DB, function(err, client, done){
        if(err){return cb(err);}

        /* CONNECTION POOL DEBUGGING */
        var pool = pg.pools.getOrCreate(process.env.DB);
        console.log('POOLS:', Object.keys(pg.pools.all), 'SIZE:', pool.getPoolSize(), 'AVAILABLE:', pool.availableObjectsCount());

        client.query(sql, params, function(err, results){
            done();
            cb(err, results);
        });
    });

};
