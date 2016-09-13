/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * 'License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
/* globals module, process */
var port = process.env.PORT || 3000; // eslint-disable-line no-process-env

module.exports = (function() {
    'use strict';

    function initApp() {
        var express = require('express');
        var morgan = require('morgan');
        var bodyParser = require('body-parser');
        var cookieParser = require('cookie-parser');
        var cors = require('cors');

        var app = express();

        // logger
        app.use(morgan('dev'));

        // parsers
        app.use(bodyParser.urlencoded({extended: 'true'}));
        app.use(bodyParser.json({type: 'application/vnd.api+json'}));
        app.use(cookieParser());

        // add CORS for debugging
        app.use(cors({
            origin: true,
            credentials: true
        }));

        // static files
        app.use('/', express.static('public'));

        return app;
    }

    function initServer(app) {
        var http = require('http');
        var server = http.createServer(app);
        return server;
    }

    function initWebSockets(server) {
        var ws = require('ws');
        var wss = new ws.Server({ server: server });

        wss.on('connection', function(socket) {
            console.log(Date.now() + ' Client connected');

            socket.on('message', function incoming(message) {
                console.log('received: %s', message);
            });

            socket.on('close', function() {
                console.log(Date.now() + ' Client disconnected');
            });
        });

        return wss;
    }

    function addRoutes(app, wss) {

        app.post('/whathappened', function(req, res) {
            var disaster = req.body.disaster;
            var country = req.body.country;

            wss.clients.forEach(function(client) {
                try {
                    client.send(JSON.stringify({
                        disaster: disaster,
                        country: country
                    }));
                } catch (e) {
                    console.error(e);
                }
            });

            res.sendStatus(200);
        });

    }

    var app = initApp();
    var server = initServer(app);
    var wss = initWebSockets(server);
    addRoutes(app, wss);
    server.listen(port, null, function() {
        console.log('Listening on port ' + port);
    });

    return app;

}());
