var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

app.set('port', process.env.PORT || 1337);

app.listen(app.get('port'), function () {
    console.log('listening');
});

