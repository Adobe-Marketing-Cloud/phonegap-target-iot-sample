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
