/**
 * Created by Machete on 27.03.2016.
 */
var express = require('express');
var app = express();

app.use(express.static('src'));

var server = app.listen((process.env.PORT || 3000), function(){
    var port = server.address().port;
    console.log('Listening to http://localhost:%s', port);
});