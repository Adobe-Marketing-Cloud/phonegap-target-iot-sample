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

    var DISASTER = 'hurricane';
    var COUNT = 10;
    var THRESHOLD = 87;

    app.addDisasterHandler(DISASTER, function(trigger) {

        var countLevel = 0;
        if (window.DBMeter) {
            window.DBMeter.start(function(dB) {
                if (dB > THRESHOLD) {
                    countLevel++;
                    if (countLevel > COUNT) {
                        trigger();
                        countLevel = 0;
                    }
                } else {
                    countLevel = 0;
                }
            });
        }
    });

}(window.app));
