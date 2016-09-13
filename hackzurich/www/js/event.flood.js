/*
 *  Copyright 2016 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
(function(app) {
    'use strict';

    var DISASTER = 'flood';
    var COUNT = 10;
    var DELAY = 500;

    app.addDisasterHandler(DISASTER, function(trigger) {

        var previousTouch, counter;
        document.addEventListener('touchend', function(ev) {
            var now = new Date().getTime();
            var diff = now - previousTouch;
            if((diff < DELAY) && (diff > 0)) {
                counter++;
                if (counter > COUNT) {
                    trigger();
                    counter = 0;
                }
            }
            else {
                counter = 0;
            }
            previousTouch = now;
        });
    });

}(window.app));
