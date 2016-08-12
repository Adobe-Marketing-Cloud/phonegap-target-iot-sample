/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2016 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
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
