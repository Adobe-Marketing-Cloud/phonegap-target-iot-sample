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

var AdobeHackZurichApp = (function() {
    'use strict';

    var SERVER_ENDPOINT = 'https://adobehackzurich.herokuapp.com';
    var COUNTRY_KEY = 'com.adobe.hackzurich.country';
    var APP_CLASS = 'hackzurich-App';
    var COUNTRY_SELECTOR = '.hackzurich-App-country';
    var EVENT_SELECTOR = '.hackzurich-Event';

    var App;
    var disasterTimeout;
    var disasterHandlers = {};

    function _notify(fn, fallback, args) {
        if (typeof fn === 'function') {
            fn.apply(null, args);
        }
        else {
            console[fallback].apply(null, args);
        }
    }

    function _sendToServer(country, eventName, success, error) {
        if (!SERVER_ENDPOINT) {
            (typeof success === 'function' && success(country, eventName)) || console.info(country, eventName);
            return;
        }
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    _notify(success, 'info', [country, eventName]);
                }
                else {
                    _notify(error, 'error', [country, eventName, request.statusText || 'Server connection failed']);
                }
            }
        };
        request.open('Post', SERVER_ENDPOINT + '/whathappened', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send('country=' + country + '&disaster=' + eventName);
    }

    function _trigger(eventName) {
        return function(options) {
            document.dispatchEvent(new CustomEvent(
                eventName,
                {
                    detail: options,
                    bubbles: true,
                    cancelable: true
                }
           ));
       };
    }

    function _getRandomCountry() {
        var countrySelect = document.querySelector(COUNTRY_SELECTOR);
        var countries = countrySelect.querySelectorAll('option');
        return countrySelect.options[Math.round(Math.random() * countries.length)].value;
    }

    function _showDisaster(event) {
        var self = this;
        self.showStatus(App.status.EVENT, event + '!');
        var appEl = document.querySelector('.' + APP_CLASS);
        appEl.className = APP_CLASS + ' ' + APP_CLASS + '--' + event;
        window.clearTimeout(disasterTimeout);
        disasterTimeout = window.setTimeout(function() {
            appEl.className = APP_CLASS;
            self.showStatus(App.status.READY);
        }, 5000);
    }

    /**
     * The mobile app.
     * @class App
     */
    App = function() {
        var countrySelect = document.querySelector(COUNTRY_SELECTOR);
        countrySelect.value = this.getCountry();

        document.addEventListener('deviceready', function() {
            this.showStatus(App.status.READY);
        }.bind(this), false);
        document.querySelector(COUNTRY_SELECTOR).addEventListener('change', function(ev) {
            localStorage.setItem(COUNTRY_KEY, ev.target.value);
        });
    };

    /**
     * Possible statuses for the application.
     * @memberof App
     * @readonly
     * @enum {String}
     */
    App.status = Object.freeze({
        ERROR: 'error',
        EVENT: 'event',
        READY: 'ready',
        WAITING: 'waiting'
    });

    /**
     * Returns the supported disasters.
     *
     * @memberof App
     *
     * @return {String[]} The supported disasters
     */
    App.prototype.getDisasters = function() {
        return Object.keys(disasterHandlers);
    };

    /**
     * Get the selected country.
     *
     * @memberof App
     *
     * @return {String} the selected country (defaults to a random one)
     */
    App.prototype.getCountry = function() {
        var country = localStorage.getItem(COUNTRY_KEY);
        if (!country) {
            country = _getRandomCountry();
            localStorage.setItem(COUNTRY_KEY, country);
        }
        return country;
    };

    /**
     * Show the desired status in the application.
     *
     * @memberof App
     *
     * @param  {String} status    the application status
     * @param  {String} [message] Optional message to be set
     */
    App.prototype.showStatus = function(status, message) {
        if (Object.keys(App.status).map(function(i) { return App.status[i]; }).indexOf(status) === -1) {
            status = App.status.ERROR;
            message = 'Invalid status';
        }
        var eventEls = document.querySelectorAll(EVENT_SELECTOR);
        var eventEl = document.querySelector(EVENT_SELECTOR + '--' + status);
        if (eventEl) {
            [].forEach.call(eventEls, function(el) {
                el.setAttribute('style', 'display:none');
            });
            eventEl.setAttribute('style', 'display:inline-block');
            if (message) {
                eventEl.innerText = message;
            }
        }
    };

    /**
     * Trigger the desired disaster.
     *
     * @memberof App
     *
     * @param  {String} event The disaster to be triggered
     */
    App.prototype.triggerDisaster = function(event) {
        var self = this;
        if (Object.keys(disasterHandlers).indexOf(event) === -1) {
            console.error('Invalid disaster type', event);
            return;
        }
        var country = this.getCountry();
        self.showStatus(App.status.WAITING);
        _sendToServer(country, event,
            function(c, ev) {
                _showDisaster.call(self, ev);
            },
            function(c, ev, err) {
                self.showStatus(App.status.ERROR, ev + ': ' + err);
                window.setTimeout(function() {
                    self.showStatus(App.status.READY);
                }, 2000);
            }
        );
    };

    /**
     * Register a new disaster handler.
     *
     * @memberof App
     *
     * @param  {String}   event   The event to be handled
     * @param  {Function} handler The disaster handler object
     */
    App.prototype.addDisasterHandler = function(event, handler) {
        if (Object.keys(disasterHandlers).indexOf(event) > -1) {
            console.error('Event already registered', event);
            return;
        }
        disasterHandlers[event] = {
            readyListener: function() {
                handler.call(this, _trigger(event));
            }.bind(this),
            eventListener: function(ev) {
                this.triggerDisaster(ev.type);
            }.bind(this)
        };
        document.addEventListener(event, disasterHandlers[event].eventListener, false);
        document.addEventListener('deviceready', disasterHandlers[event].readyListener, false);
    };

    /**
     * Remove the desired disaster handler.
     *
     * @memberof App
     *
     * @param  {String}   event   The event to be handled
     */
    App.prototype.removeDisasterHandler = function(event) {
        if (Object.keys(disasterHandlers).indexOf(event) > -1) {
            document.removeEventListener(event, disasterHandlers[event].eventListener);
            document.removeEventListener('deviceready', disasterHandlers[event].readyListener);
            delete disasterHandlers[event];
        }
    };

    return App;

}());

window.app = new AdobeHackZurichApp();
