var debug = require('debug')('serandules-hub-services');
var mongourl = 'mongodb://localhost/test';

var express = require('express');
var app = express();

var PORT = 4000;

var mongoose = require('mongoose');
mongoose.connect(mongourl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    debug('connected to mongodb : ' + mongourl);
    /*app.use(require('auth')({
        open: [
            '^(?!\\/apis(\\/|$)).+',
            '^\/apis\/v\/tokens([\/].*|$)',
            '^\/apis\/v\/vehicles$',
            '^\/apis\/v\/menus\/.*$'
        ]
    }));*/
    app.use('/apis/v', require('./menus'));

    app.use(express.json());
    app.use(express.urlencoded());

    app.listen(PORT);
    debug('listening on port ' + PORT);
});