Hazard Experience Viewer
========================

This static site leverages [Adobe Target](https://www.adobe.com/marketing-cloud/testing-targeting.html) in order to provide a targeted experience for different audiences.
The experience can combine one or multiple widgets which react on the disaster events collected by the node [hazard-server](../). The mapping between the widgets and the audience is configured in Adobe Target.

## Widgets


|Tag                                | Feature  
|-----------------------------------------------------------------------
|`<div class="hazard-listing"/>`    | List all the disaster events received
|`<div class="hazard-statistics"/>` | Keep track and displays the number of disaster events 
|`<div class="hazard-forecast"/>`   | Compute the probability of a disaster in the next day (currently evaluated with `Math.random` ..)
|`<div class="hazard-watch-ch"/>`   | Report the disaster events which occur in Switzerland


## Test

### Locally

You could run the site locally using python

```
$ cd hazard-experience-viewer/www
$ python -m SimpleHTTPServer 8000
```

then browse

```
http://localhost:8000
```

Please adjust the variable `SERVER_ENDPOINT` in the file `www/index.html` if you want to connect to a custom `hazard-server` instance 

### Hosted

The site is hosted on github at [https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/www/index.html](https://adobe-marketing-cloud.github.io/phonegap-target-iot-sample/hazard-experience-viewer/www/index.html)
