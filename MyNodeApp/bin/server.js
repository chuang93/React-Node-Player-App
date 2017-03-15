#!/usr/bin/env node
global.navigator = { userAgent: 'all' };
//NEED THIS BECAUSE WE ARE NOW TALKING ABOUT SERVER SIDE 
var debug = require('debug')('MyNodeApp');
var app = require('../app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

console.log('running server!');