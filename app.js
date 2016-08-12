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

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Listening on port ' + port);

var wss = new WebSocketServer({ server: app });
wss.on('connection', function (ws) {
  console.log('Client connected');
  ws.on('close', function () {
  	console.log('Client disconnected')	
  });
});

app.post('/whathappened', function (req, res) {
	var event = req.body.catastrophe;
	var country = req.body.country;
	var name = req.body.name;

	console.log(country, event);

	/*wss.clients.forEach(function (client) {
		client.send({
			emergency: event,
			location: country,
			reported: name
		});
	});*/

	res.sendStatus(200);
});

module.exports = app;
