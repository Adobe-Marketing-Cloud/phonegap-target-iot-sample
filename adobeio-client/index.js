'use strict';

var jwt = require('jwt-simple');
var request = require('request');

var ADOBE_IO_URL = 'https://mc.adobe.io';
var ADOBE_JWT_HOST = 'https://ims-na1.adobelogin.com/ims/exchange/jwt';

var apiKey, token, reqOptions;

module.exports = {
    auth: function (clientId, clientSecret, privateKey, payload, cb){
        payload.exp = (new Date()).getTime() / 1000 + 24 * 60 * 60; // expiry one day
        var jwtToken = jwt.encode(payload, privateKey, 'RS256');
        getToken(ADOBE_JWT_HOST, clientId, clientSecret, jwtToken, function (err, tokenData) {
            if (err) return cb(err);
            if (!tokenData['access_token']) return cb(tokenData.error)
            token = tokenData['access_token'];
            apiKey = clientId;
            reqOptions = {
                auth: {
                    bearer: token
                },
                headers: {
                    "X-Api-Key": apiKey,
                    "Cache-Control": "no-cache"
                }
            };
            cb(null, true);
        });
    },

    get: function (path, cb) {
        reqOptions.url = ADOBE_IO_URL + path;
        request.get(reqOptions, cb);
    },

    post: function (path, formData, cb) {
        requestUpdate(ADOBE_IO_URL + path, formData, 'post', cb);
    },

    put: function (path, formData, cb) {
        requestUpdate(ADOBE_IO_URL + path, formData, 'put', cb);
    },

    delete: function (path, cb) {
        reqOptions.url = ADOBE_IO_URL + path;
        request.delete(reqOptions, cb);
    }
};

function requestUpdate(path, formData, method, cb) {
    reqOptions.url = path;
    var postOptions = JSON.parse(JSON.stringify(reqOptions));
    postOptions.form = formData;
    postOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    postOptions.method = method;
    request(postOptions, cb);
}

function getToken(jwtHost, clientId, clientSecret, jwtToken, cb) {
    var formData = {
        "client_id" : clientId,
        "client_secret" : clientSecret,
        "jwt_token" : jwtToken
    };
    reqOptions = {
        headers: {
            "Cache-Control": "no-cache"
        }
    };
    requestUpdate(jwtHost, formData, 'post', function(err, httpResponse, body) {
        if (err) {
            return cb(err);
        }
        cb(null, JSON.parse(body));
    });
}