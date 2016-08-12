<a name="App"></a>

## App
**Kind**: global class  

* [App](#App)
    * [new App()](#new_App_new)
    * _instance_
        * [.getDisasters()](#App+getDisasters) ⇒ <code>Array.&lt;String&gt;</code>
        * [.getCountry()](#App+getCountry) ⇒ <code>String</code>
        * [.showStatus(status, [message])](#App+showStatus)
        * [.triggerDisaster(event)](#App+triggerDisaster)
        * [.addDisasterHandler(event, handler)](#App+addDisasterHandler)
        * [.removeDisasterHandler(event)](#App+removeDisasterHandler)
    * _static_
        * [.status](#App.status) : <code>enum</code>

<a name="new_App_new"></a>

### new App()
The mobile app.

<a name="App+getDisasters"></a>

### app.getDisasters() ⇒ <code>Array.&lt;String&gt;</code>
Returns the supported disasters.

**Kind**: instance method of <code>[App](#App)</code>  
**Returns**: <code>Array.&lt;String&gt;</code> - The supported disasters  
<a name="App+getCountry"></a>

### app.getCountry() ⇒ <code>String</code>
Get the selected country.

**Kind**: instance method of <code>[App](#App)</code>  
**Returns**: <code>String</code> - the selected country (defaults to a random one)  
<a name="App+showStatus"></a>

### app.showStatus(status, [message])
Show the desired status in the application.

**Kind**: instance method of <code>[App](#App)</code>  

| Param | Type | Description |
| --- | --- | --- |
| status | <code>String</code> | the application status |
| [message] | <code>String</code> | Optional message to be set |

<a name="App+triggerDisaster"></a>

### app.triggerDisaster(event)
Trigger the desired disaster.

**Kind**: instance method of <code>[App](#App)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The disaster to be triggered |

<a name="App+addDisasterHandler"></a>

### app.addDisasterHandler(event, handler)
Register a new disaster handler.

**Kind**: instance method of <code>[App](#App)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The event to be handled |
| handler | <code>function</code> | The disaster handler object |

<a name="App+removeDisasterHandler"></a>

### app.removeDisasterHandler(event)
Remove the desired disaster handler.

**Kind**: instance method of <code>[App](#App)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The event to be handled |

<a name="App.status"></a>

### App.status : <code>enum</code>
Possible statuses for the application.

**Kind**: static enum property of <code>[App](#App)</code>  
**Read only**: true  
