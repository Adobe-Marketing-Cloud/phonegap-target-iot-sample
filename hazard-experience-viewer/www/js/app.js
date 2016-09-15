/**
 * Copyright 2016 Adobe Systems, Inc. http://www.adobe.com
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var statistics = 0;
var forcast = 0.0;

$(document).bind('DOMNodeInserted', function(e) {

 	var $elt = $(e.target);

 	if ($elt.is('.hazard-listing')) {

 		$elt.append('<h3>Hazard Listing</h3>').append('<ul>');
		
		document.body.addEventListener('hazard', function (e) {
			var detail = e.detail;
			$('.hazard-listing > ul').append('<li>Hazard: ' + detail.disaster + ' ' + detail.country + '</li>');
		}, false);

 	}

 	if ($elt.is('.hazard-statistics')) {

 		$elt.append('<h3>Hazard Stats</h3>').append('<p>');
		
		document.body.addEventListener('hazard', function (e) {
			statistics++;
			var detail = e.detail;
			$('.hazard-statistics > p').html('Total events: ' + statistics);
		}, false);

 	}

 	if ($elt.is('.hazard-forecast')) {

 		$elt.append('<h3>Hazard Forecast</h3>').append('<p>');
		
		document.body.addEventListener('hazard', function (e) {
			forecast = Math.round(Math.random() * 100);
			var detail = e.detail;
			$('.hazard-forecast > p').html('Probability to have a similar event in the next hour: ' + forecast + '%');
		}, false);
 	}

 	if ($elt.is('.hazard-watch-ch')) {

 		$elt.append('<h3>Switzerland Hazard Watch</h3>').append('<p>');
		
		document.body.addEventListener('hazard', function (e) {
			var detail = e.detail;
			if (detail.country === 'ch') {
				$('.hazard-watch-ch > p').html('Warning, ' + detail.disaster + ' near you!');
			}
		}, false);
 	}

});

