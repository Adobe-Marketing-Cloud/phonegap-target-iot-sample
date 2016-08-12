Adobe HackZurich Cordova App
============================

Mobile App
----------

### How it works
- start the app
- choose a country
- trigger a disaster

#### Possible disasters

Disaster   | Trigger
-----------|--------------------------------------------------------
Earthquake | Shake the phone
Flood      | Quickly tap the screen multiple times with your fingers
Hurricane  | Blow continuously in the mike for a second

### Development

#### Requirements
- [nodejs](https://nodejs.org/en/download/)
- [cordova](https://cordova.apache.org/docs/en/latest/guide/cli/)

#### Building and running the app
- `cd hackzurich`
- adjust the `SERVER_ENDPOINT` variable in `www/js/app.js` if you want to use a custom server
- connect your mobile phone to the computer
- `cordova platform add android` or `cordova platform add ios`
- `cordova run android` or `cordova run ios`

#### Adding support for new disasters
The disasters and there handlers are registered in a modular way.

To add a new disaster handler, just use the `window.app.addDisasterHandler(event, handler)` method.  
Take a look at the `www/js/event.*.js` files for examples.

#### App API

See [api.md](api.md).

Server
------

#### Requirements
- [nodejs](https://nodejs.org/en/download/)

#### Running the server
- `npm install`
- `node app.js`
