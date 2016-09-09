var port = process.env.PORT || 3000;

var server = require('http').createServer();
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var cors = require('cors');
var ws = require('ws');

var app = express();
var WebSocketServer = require('ws').Server;

app.use(morgan('dev'));

// parsers
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type:'application/vnd.api+json'
}));
app.use(cookieParser());

// add CORS for debugging
app.use(cors({
    origin: true,
    credentials: true
}));

app.use('/public', express.static('public'));

server.on('request', app);
server.listen(port);

var wss = new WebSocketServer({ server: server });
wss.on('connection', function (ws) {
    console.log(Date.now() + ' Client connected');

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.on('close', function () {
        console.log(Date.now() + ' Client disconnected');    
    });
});

console.log('Listening on port ' + port);

app.post('/whathappened', function (req, res) {
    var event = req.body.catastrophe;
    var country = req.body.country;
    var name = req.body.name;

    console.log(country, event);

    wss.clients.forEach(function (client) {
        try { 
            client.send({
                emergency: event,
                location: country,
                reported: name
            });
        } catch (e) {
            console.error(e);
        }
    });

    res.sendStatus(200);
});

module.exports = app;
