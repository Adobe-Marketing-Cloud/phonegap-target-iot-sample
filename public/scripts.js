(function(window, document) {
    'use strict';

    var SERVER_ENDPOINT = 'wss://adobehackzurich.herokuapp.com';
    var DISASTER_TIMEOUT = 5000;
    var COUNTRIES = {
            al: 'Albania',
            ad: 'Andorra',
            am: 'Armenia',
            at: 'Austria',
            az: 'Azerbaijan',
            by: 'Belarus',
            be: 'Belgium',
            ba: 'Bosnia and Herzegovina',
            bg: 'Bulgaria',
            hr: 'Croatia',
            cy: 'Cyprus',
            cz: 'Czech Republic',
            dk: 'Denmark',
            ee: 'Estonia',
            fi: 'Finland',
            fr: 'France',
            ge: 'Georgia',
            de: 'Germany',
            gr: 'Greece',
            hu: 'Hungary',
            is: 'Iceland',
            ir: 'Ireland',
            it: 'Italy',
            kz: 'Kazakhstan',
            xk: 'Kosovo',
            lv: 'Latvia',
            li: 'Liechtenstein',
            lt: 'Lithuania',
            lu: 'Luxembourg',
            mk: 'Macedonia',
            mt: 'Malta',
            md: 'Moldova',
            mc: 'Monaco',
            me: 'Montenegro',
            nl: 'Netherlands',
            no: 'Norway',
            pl: 'Poland',
            pt: 'Portugal',
            ro: 'Romania',
            ru: 'Russia',
            sm: 'San Marino',
            rs: 'Serbia',
            sk: 'Slovakia',
            si: 'Slovenia',
            es: 'Spain',
            se: 'Sweden',
            ch: 'Switzerland',
            tr: 'Turkey',
            ua: 'Ukraine',
            gb: 'United Kingdom',
            va: 'Vatican City'
    };

    var AdobeHackZurichWebApp = (function() {

        function getCountryElement(country) {
            return document.querySelector('#' + country);
        }

        function hideDisasterNotification(country, disaster) {
            var el = getCountryElement(country);
            el.classList.remove('hackzurich-Disaster--' + disaster);
        }

        function showDisasterNotification(country, disaster) {
            var el = getCountryElement(country);
            el.classList.add('hackzurich-Disaster--' + disaster);
            window.setTimeout(function() {
                hideDisasterNotification(country, disaster);
            }, DISASTER_TIMEOUT);
        }

        function logDisaster(country, disaster) {
            var el = document.createElement('div');
            el.className = 'hackzurich-DisasterLogEntry';
            el.textContent = '[' + new Date().toLocaleString() + '] ' + COUNTRIES[country] + ': ' + disaster;
            var logEl = document.querySelector('.hackzurich-DisasterLog');
            logEl.insertBefore(el, logEl.firstChild);
        }

        var App = function() {};

        App.prototype.triggerDisaster = function(country, disaster) {
            logDisaster(country, disaster);
            showDisasterNotification(country, disaster);
        };

        return App;

    }());

    var ws = new WebSocket(SERVER_ENDPOINT);
    ws.onopen = function(ev) {
        console.log('Websocket connection ' + ev.type);
    };
    ws.onmessage = function(ev) {
        var data = JSON.parse(ev.data) || {};
        window.app.triggerDisaster(data.country, data.disaster);
    };

    window.app = new AdobeHackZurichWebApp();

}(window, document));
