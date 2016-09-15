# Adobe I/O Node.js Client

A simple node.js client for Adobe I/O API: https://www.adobe.io/.

## Super simple to use
After you clone this Git project, install the npm package:
```sh
$ npm install [PATH TO adobeio-client]
```

Import the lib to create your client:
```javascript
var client = require('adobeio-client')
```

Authenticate the client with information you get from Adobe I/O console:
```javascript
client.auth(apiKey, clientSecret, privateKey, payload, callback)
```
* `apiKey` and `clientSecret`: security artifacts that can be obtained in Adobe I/O console.
* `privateKey`: can be a string or buffer containing the private key generated from your public certificate [0].
* `payload`: the json object from the console, "exp" and "jti" are optional.
* `callback`: the callback function for handling results when authorization process is done. Format `function(error, result) {}` in which result is true if authorization is successful.

Once client is authenticated, you can make any API request to the available endpoints of Target API [1], for example:
```javascript
client.request('/{tenant_id}/target/activities', 'get', function(error, resp, body) {
    // your handling code here
})
```

## References
[0] https://www.adobe.io/products/target/docs/reference/authentication/Certificatecreation  
[1] https://www.adobe.io/products/target/docs/getting-started
